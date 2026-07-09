import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { callApi } from '../services/apiClient';
import { getApiErrorMessage } from '../services/ApiError';

export default function ProfilePage<ProfileResponse>() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [apiProfile, setApiProfile] = useState<ProfileResponse | null>(null);
    const [error, setError] = useState('');

    async function loadApiProfile() {
        try {
            setError('');

            const response = await callApi<ProfileResponse>(
                '/api/profile',
                getAccessTokenSilently
            );

            setApiProfile(response);
        } catch (error) {
            console.error('Profile API Error:', error);
            setError(getApiErrorMessage(error));
        }
    }

    return (
        <section>
            <h1>Profile</h1>

            <h2>Auth0 user claims from frontend</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <button type="button" onClick={loadApiProfile}>Load backend JWT profile</button>

            {error && <p className="error">{error}</p>}
            {apiProfile !== null && <pre>{JSON.stringify(apiProfile, null, 2)}</pre>}
        </section>
    );
}