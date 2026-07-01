# Architecture

This project is a full-stack secure customer identity portal.

## Components

- React frontend: handles the user interface and Auth0 login/logout flow.
- Auth0: acts as the identity provider and issues tokens.
- Spring Boot backend: acts as the protected API/resource server.
- H2 database: used locally for audit-event persistence.

## Request Flow

1. User opens the React frontend.
2. User logs in through Auth0.
3. React receives authentication state and access token.
4. React sends API requests to Spring Boot with a Bearer token.
5. Spring Boot validates the JWT before returning protected data.

## Design Approach

The backend is structured to keep responsibilities separate:

- Controllers handle HTTP requests.
- Services contain application logic.
- Repositories handle database access.
- DTOs define API response/request shapes.
- Configuration classes handle security and application setup.