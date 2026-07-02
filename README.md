# Secure Customer Identity Portal

A full-stack customer identity and access management portfolio project built with React, TypeScript, Spring Boot, Spring Security, OAuth2/OpenID Connect, Auth0 and JWT-secured APIs.

The project demonstrates how a modern single-page application can authenticate users through an external identity provider, call protected backend APIs using access tokens, separate customer and admin access, and expose basic operational health checks.

## Why I Built This Project

I built this project to strengthen my practical understanding of customer identity and access management concepts, especially authentication, authorization, token validation, protected routes, role-based access control and secure API design.

The aim is not to build a production identity platform from scratch. Instead, the project focuses on integrating established identity standards and tools in a clean, testable and well-documented way.

This project also gives me a realistic space to practise professional engineering habits such as:

* clear backend and frontend separation
* meaningful commit history
* security-conscious design decisions
* pragmatic use of SOLID principles
* clean project structure
* consistent error handling
* testable service and controller layers
* documentation of architecture and trade-offs

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Auth0 React SDK
* Axios
* Vitest and React Testing Library

### Backend

* Java 17
* Spring Boot
* Spring Security
* OAuth2 Resource Server
* Spring Data JPA
* H2 Database for local development
* Spring Boot Actuator
* JUnit and Spring MockMvc

### DevOps and Tooling

* Git and GitHub
* Docker and Docker Compose
* GitHub Actions
* VS Code

## High-Level Architecture

```text
React Frontend
  |
  | 1. Redirects user to Auth0 Universal Login
  v
Auth0 Tenant
  |
  | 2. Issues ID token and access token after successful authentication
  v
React Frontend
  |
  | 3. Sends access token in Authorization header
  v
Spring Boot Backend API
  |
  | 4. Validates JWT issuer, audience and permissions
  v
Protected Customer/Admin Resources
```

The frontend is responsible for the user experience and login flow.
Auth0 is responsible for authentication and issuing standards-based tokens.
The Spring Boot backend is responsible for validating access tokens and protecting API resources.

## Current Features

* Spring Boot backend running on port 8080
* Public health endpoint using Spring Boot Actuator
* Public API status endpoint
* Protected customer dashboard endpoint
* Protected customer profile endpoint
* Protected admin summary endpoint
* Spring Security configuration with backend form login disabled
* H2 database configuration for local development
* Basic audit event entity and repository
* React TypeScript frontend shell
* Project-level `.gitignore`
* Meaningful Git commit history

## Security Design

This project follows the principle that authentication should be delegated to a trusted identity provider rather than implemented manually inside the application.

The backend is designed to act as an OAuth2 resource server. That means it should not manage user passwords or login sessions directly. Instead, it validates JWT access tokens issued by Auth0.

Important security decisions:

* Backend form login is disabled because users should authenticate through Auth0, not through Spring Boot’s default login page.
* Public endpoints are kept intentionally limited.
* Protected API routes require authentication.
* Admin API routes will require specific permissions once Auth0 RBAC is fully connected.
* Access tokens should never be logged.
* Environment-specific Auth0 values should not be committed to GitHub.
* The frontend should handle 401 and 403 responses differently.

## API Endpoint Overview

| Endpoint                 | Access          | Purpose                                    |
| ------------------------ | --------------- | ------------------------------------------ |
| `GET /actuator/health`   | Public          | Confirms backend health                    |
| `GET /api/public/status` | Public          | Confirms API availability                  |
| `GET /api/dashboard`     | Protected       | Returns customer dashboard data            |
| `GET /api/profile`       | Protected       | Returns authenticated user profile details |
| `GET /api/admin/summary` | Protected/Admin | Returns admin-only operational summary     |

## Backend Design Approach

The backend is organised around clear responsibilities:

```text
config       Spring Security and application configuration
controller   HTTP request/response layer
service      Business and application logic
repository   Data access using Spring Data JPA
model        Persistence entities
dto          API request and response shapes
exception    Centralised error handling
```

Controllers should remain thin. They should receive requests, delegate work to services, and return clear response DTOs.

Business logic should live in services so it can be tested independently.

Repositories should only handle persistence concerns.

## Error Handling Approach

The project will use a consistent API error response format so frontend code can handle errors predictably.

Planned backend error format:

```json
{
  "timestamp": "2026-07-01T22:30:00Z",
  "status": 403,
  "error": "FORBIDDEN",
  "message": "You do not have permission to access this resource",
  "path": "/api/admin/summary"
}
```

The frontend should handle common cases clearly:

| Status        | Meaning                                               | Frontend behaviour               |
| ------------- | ----------------------------------------------------- | -------------------------------- |
| 401           | User is not authenticated or token is missing/invalid | Ask user to log in again         |
| 403           | User is authenticated but lacks permission            | Show access denied message       |
| 500           | Backend error                                         | Show friendly fallback message   |
| Network error | Backend unavailable                                   | Show service unavailable message |

## Testing Strategy

The project uses pragmatic testing rather than testing every implementation detail.

Backend tests should cover:

* public endpoints are accessible
* protected endpoints reject unauthenticated requests
* admin endpoints require the correct authority
* audit service stores meaningful events
* global exception handler returns consistent error responses

Frontend tests should cover:

* app shell renders correctly
* login/logout controls render based on authentication state
* protected routes prevent unauthenticated access
* API client handles success, 401, 403 and network failures

## Local Development Setup

### Prerequisites

* Java 17 or later
* Node.js LTS
* npm
* Git
* VS Code
* Auth0 account

### Run the Backend

```powershell
cd backend
.\gradlew.bat bootRun
```

Backend runs at:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/actuator/health
```

Public API status:

```text
http://localhost:8080/api/public/status
```

### Run the Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Auth0 Configuration

Create an Auth0 Single Page Application for the React frontend and an Auth0 API for the Spring Boot backend.

Frontend environment values:

```text
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=https://secure-customer-identity-api
VITE_API_BASE_URL=http://localhost:8080
```

Backend environment values:

```text
AUTH0_ISSUER_URI=https://your-auth0-domain/
AUTH0_AUDIENCE=https://secure-customer-identity-api
```

Real tenant values should be configured locally and should not be committed to GitHub.

## Project Structure

```text
secure-customer-identity-portal/
  backend/
    src/main/java/com/abhinav/backend/
      config/
      controller/
      model/
      repository/
      service/
      dto/
      exception/
    src/main/resources/
      application.yml
    src/test/java/com/abhinav/backend/
  frontend/
    src/
      auth/
      components/
      pages/
      services/
      tests/
  docs/
    architecture.md
    auth-flow.md
    security-checklist.md
    operational-runbook.md
  .github/workflows/
  README.md
```

## Current Limitations

This is a portfolio learning project, not a production CIAM system.

Current limitations include:

* no production database
* no production cloud deployment yet
* no SAML or SCIM implementation
* no Kubernetes deployment
* no advanced monitoring or alerting platform
* no real customer data

These limitations are intentional so the project can stay focused on OAuth2/OIDC, JWT validation, protected routes, RBAC-style access, testing and documentation.

## Future Improvements

Planned improvements:

* complete Auth0 login/logout integration in the React frontend
* validate JWT access tokens in the Spring Boot backend
* add role/permission-based admin access
* add global backend exception handling
* add frontend error boundary and API error states
* add audit event service and audit endpoint
* add unit and integration tests
* add Dockerfiles and Docker Compose
* add GitHub Actions CI workflow
* add screenshots and architecture diagrams
* add operational runbook documentation

## What I Am Practising

This project is helping me practise:

* OAuth2 and OpenID Connect concepts
* Auth0 integration
* JWT-secured backend APIs
* Spring Security resource server configuration
* React protected route patterns
* role and permission based access control
* clean backend layering
* pragmatic SOLID principles
* testable code design
* secure error handling
* documentation-first engineering
