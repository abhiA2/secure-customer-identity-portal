# Security Checklist

## Implemented

- Spring Security enabled.
- Default Spring Boot form login disabled.
- Public endpoints are explicitly listed.
- Protected API routes require authentication.
- H2 console is only intended for local development.
- Real Auth0 values should not be committed to GitHub.
- Tokens should not be logged.

## Planned

- Validate Auth0 JWT issuer.
- Validate Auth0 JWT audience.
- Map Auth0 permissions to Spring Security authorities.
- Add admin-only permission checks.
- Add consistent API error responses.
- Handle 401 and 403 clearly in the frontend.
- Add tests for public and protected endpoints.

## Notes

This is a portfolio learning project, not a production CIAM platform. Production use would require stronger monitoring, secure secret management, production database configuration and deployment hardening.
