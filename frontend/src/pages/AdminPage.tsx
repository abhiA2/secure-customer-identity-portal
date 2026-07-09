import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { callApi } from '../services/apiClient';
import type { AdminSummaryResponse } from '../types/api';
import { getApiErrorMessage } from '../services/ApiError';

export default function AdminPage() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState<AdminSummaryResponse | null>(null);
    const [error, setError] = useState('');

    async function loadAdminSummary() {
        try {
            setError('');

            const response = await callApi<AdminSummaryResponse>(
                '/api/admin/summary',
                getAccessTokenSilently
            );

            setData(response);
        } catch (error) {
            console.error('Admin API Error:', error);
            setError(getApiErrorMessage(error));
        }
    }

    return (
        <section>
            <h1>Admin Summary</h1>
            <button type="button" onClick={loadAdminSummary}>
                Load admin summary
            </button>

            {error && <p className="error">{error}</p>}
            {data !== null && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </section>
    );
}