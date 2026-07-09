import axios from 'axios';
import { ApiError } from './ApiError';

function getApiBaseUrl(): string {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!apiBaseUrl) {

        throw new ApiError(
            'CONFIGURATION_ERROR',
            'The Api Base URL is not configured'
        );
    }
    return apiBaseUrl;
}

export async function callApi<T>(
    path: string,
    getAccessTokenSilently: () => Promise<string>
): Promise<T> {
    try {
        const token = await getAccessTokenSilently();

        const response = await axios.get<T>(
            `${getApiBaseUrl()}${path}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        if (!axios.isAxiosError(error)) {
            throw new ApiError(
                'UNKNOWN_ERROR',
                'An unexpected error occured !',
                undefined,
                error
            );
        }

        if (!error.response) {
            throw new ApiError(
                'NETWORK_ERROR',
                'Backend Service could not be reached !',
                undefined,
                error
            );
        }

        const status = error.response.status;

        if (status === 401) {
            throw new ApiError(
                'UNAUTHORIZED',
                'Your session is missing, expired, or invalid !',
                status,
                error
            );
        }

        if (status === 403) {
            throw new ApiError(
                'FORBIDDEN',
                'You do not have permission to access this resource !',
                status,
                error
            );
        }

        if (status >= 500) {
            throw new ApiError(
                'SERVER_ERROR',
                'The backend service encountered an error !',
                status,
                error
            );
        }

        throw new ApiError(
            'UNKNOWN_ERROR',
            'The API request could not be completed !',
            status,
            error
        );
    }
}