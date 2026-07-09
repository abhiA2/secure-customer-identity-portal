import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return (
      <section>
        <h1>Checking session...</h1>;
        <p>Please wait while we verify your authentication status.</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section>
        <h1>Authentication required</h1>
        <p>
          You need to log in before accessing this page.
        </p>

        <button
          type="button"
          onClick={() =>
            loginWithRedirect({
              appState: {
                returnTo: location.pathname
              }
            })
          }
        >
          Log in to continue
        </button>
      </section>
    );
  }
  return children;
}