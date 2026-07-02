import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/admin">Admin</Link>

      {isLoading ? (
        <span>Checking session...</span>
      ) : isAuthenticated ? (
        <button
          type="button"
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin
              }
            })
          }
        >
          Log out {user?.email ? `(${user.email})` : ''}
        </button>
      ) : (
        <button type="button" onClick={() => loginWithRedirect()}>
          Log in
        </button>
      )}
    </nav>
  );
}