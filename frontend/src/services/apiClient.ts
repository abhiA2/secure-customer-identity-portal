import axios from 'axios';

export async function callApi<T>(
    path: string,
    getAccessTokenSilently: () => Promise<string>
): Promise<T> {
    const token = await getAccessTokenSilently();

    const response = await axios.get<T>(
        `${import.meta.env.VITE_API_BASE_URL}${path}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}