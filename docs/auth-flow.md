# Authentication and Authorization Flow

This project uses Auth0 for authentication and Spring Boot as an OAuth2 resource server.

## Flow

1. The user clicks Login in the React frontend.
2. The React app redirects the user to Auth0 Universal Login.
3. Auth0 authenticates the user.
4. Auth0 redirects the user back to the React app.
5. The React app requests an access token for the backend API.
6. React sends the access token in the Authorization header.
7. Spring Boot validates the token issuer, audience and permissions.
8. If valid, the backend returns protected data.

## Important Distinction

Authentication answers: who is the user?

Authorization answers: what is the user allowed to access?

The backend does not trust the frontend alone. It validates the JWT access token on every protected API request.