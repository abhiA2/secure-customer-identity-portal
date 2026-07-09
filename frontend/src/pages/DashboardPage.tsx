import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { callApi } from '../services/apiClient';
import type { DashboardResponse } from '../types/api';
import { getApiErrorMessage } from '../services/ApiError';

export default function DashboardPage() {
    const { getAccessTokenSilently } = useAuth0();

    const [data, setData] = useState<DashboardResponse | null>(null);
    const [error, setError] = useState('');

    async function loadDashboard() {
        try {
            setError('');

            // Backend must validate the access token, Client side is only for forwarding
            const response = await callApi<DashboardResponse>(
                '/api/dashboard',
                getAccessTokenSilently
            );


            setData(response);
        } catch (error) {
            console.error("Dashboard API Error:", error);
            setError(getApiErrorMessage(error));
        }
    }

    return (
        <section>
            <h1>Customer Dashboard</h1>
            <button type="button" onClick={loadDashboard}>
                Load secured dashboard data
            </button>

            {error && <p className="error">{error}</p>}
            {data !== null && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </section>
    );
}