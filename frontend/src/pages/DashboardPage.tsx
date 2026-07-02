import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { callApi } from '../services/apiClient';
import type { DashboardResponse } from '../types/api';

export default function DashboardPage() {
    const { getAccessTokenSilently } = useAuth0();
    
    /**To be checked later, type should not be any
    const [data, setData] = useState<any>(null); */

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
        } catch (err) {
            console.error("Dashboard API Error:", err);
            setError('Unable to load dashboard data. Check backend, Auth0 audience, or token permissions.');
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