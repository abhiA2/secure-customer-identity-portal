import { Routes, Route, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ProtectedRoute } from './auth/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    isLoading,
    error
  } = useAuth0();

  async function handleLogin() {
    console.log('Login button clicked');

    try {
      await loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: 'openid profile email read:profile read:admin read:audit'
        }
      });
    } catch (err) {
      console.error('Auth0 login error:', err);
    }
  }

  if (isLoading) {
    return <p>Loading authentication...</p>;
  }

  return (
    <main className="app-shell">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>

        {!isAuthenticated ? (
          <button type="button" onClick={handleLogin}>
            Log in
          </button>
        ) : (
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
            Log out {user?.email}
          </button>
        )}
      </nav>

      {error && (
        <p className="error">
          Auth error: {error.message}
        </p>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h1>Secure Customer Identity Portal</h1>
              <p>
                A React and Spring Boot CIAM project using Auth0, OAuth2/OIDC,
                protected routes and JWT-secured APIs.
              </p>
              {!isAuthenticated && <p>Log in to access the customer dashboard.</p>}
              {isAuthenticated && <p>You are logged in as {user?.email}</p>}
            </section>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}