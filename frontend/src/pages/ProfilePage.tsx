import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { callApi } from '../services/apiClient';

export default function ProfilePage() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [apiProfile, setApiProfile] = useState<unknown | null>(null);
    const [error, setError] = useState('');

    async function loadApiProfile() {
        try {
            setError('');
            const response = await callApi('/api/profile', getAccessTokenSilently);
            setApiProfile(response);
        } catch {
            setError('Unable to load protected API profile.');
        }
    }

    return (
        <section>
            <h1>Profile</h1>

            <h2>Auth0 user claims from frontend</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <button onClick={loadApiProfile}>Load backend JWT profile</button>

            {error && <p className="error">{error}</p>}
            {apiProfile !== null && <pre>{JSON.stringify(apiProfile, null, 2)}</pre>}
        </section>
    );
}