# Small React interface

Run npm.cmd run dev:web from the repository root and open http://localhost:5173. The supplied screen is a shell only.

Week 10 adds typed list/filter state. Week 11 adds relative /api calls, a controlled login form and logout. Weeks 12-14 cover failed/empty/loading states and review. No router, state-management package, Next.js or design system is required.

The Vite dev proxy carries /api calls to the loopback API. Use the same localhost browser origin consistently. React renders the UI; HTTP/fetch communicate with the backend, and Fastify owns authentication, validation and merchant access.

For individual practice, copy fixtures/web-starter once as directed by the [student guide](../../docs/03-student-guide.md). Do not copy a later finished shared implementation.
