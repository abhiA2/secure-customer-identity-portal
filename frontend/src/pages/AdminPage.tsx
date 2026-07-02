import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { callApi } from '../services/apiClient';
import type { AdminSummaryResponse } from '../types/api';

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
        } catch (err) {
            console.error('Admin API Error:', err);
            setError('Access denied or API call failed. Your user may not have read:admin permission.');
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