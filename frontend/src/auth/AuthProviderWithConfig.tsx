import { Auth0Provider } from '@auth0/auth0-react';
import type { ReactNode } from 'react'

type AuthProviderWithConfigProps = {
  children: ReactNode;
};

function getRequiredEnvValue(key: string): string {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Missing required Environment variable: ,${key}`);
  }

  return value;
}

export function AuthProviderWithConfig({ children }: AuthProviderWithConfigProps) {
  const domain = getRequiredEnvValue('VITE_AUTH0_DOMAIN');
  const clientId = getRequiredEnvValue('VITE_AUTH0_CLIENT_ID');
  const audience = getRequiredEnvValue('VITE_AUTH0_AUDIENCE');

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_url: window.location.origin,
        audience,
        scope: 'openid profile email read:profile read:admin read:audit'
      }}
    >
      {children}
    </ Auth0Provider>
  )
}
