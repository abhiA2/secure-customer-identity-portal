export type ApiErrorCode =
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'SERVER_ERROR'
    | 'NETWORK_ERROR'
    | 'CONFIGURATION_ERROR'
    | 'UNKNOWN_ERROR';

export class ApiError extends Error {
    constructor(
        public readonly code: ApiErrorCode,
        message: string,
        public readonly status?: number,
        public readonly originalError?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }

}

export function getApiErrorMessage(error: unknown): string {
    if (!(error instanceof ApiError)) {
        return 'An unexpected error occured. Please try again !'
    }

    switch (error.code) {
        case 'UNAUTHORIZED':
            return 'Your session is no longer valid. Please log in again.';

        case 'FORBIDDEN':
            return 'You are signed in but do not have permission to access this resource !';

        case 'NETWORK_ERROR':
            return 'The service is currently unavailable. Please check that the backend is running !';

        case 'SERVER_ERROR':
            return 'The server encountered a problem. Please try again later !';

        case 'CONFIGURATION_ERROR':
            return 'The application is missing required configuration !';

        default:
            return 'The request could not be completed. Please try again !'

    }
}