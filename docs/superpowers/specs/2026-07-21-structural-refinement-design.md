# Structural Refinement Design

Date: 2026-07-21

## Goal

Refine the backend and frontend code structure so the project is easier to maintain, type, test, and extend. This pass is intentionally more structural than a lint-only cleanup, but it must preserve the current external behavior.

## Scope

This design covers both repositories:

- `mind-blog-api`
- `mind-blog-frontend`

Each repository keeps its own Git history. The same design document is committed in both repositories so each one has local context for the refinement work.

## Non-Goals

- No route, DTO, API response, or database schema changes are allowed in this refinement.
- No visual redesign of the frontend.
- No feature additions.
- No broad dependency replacement.
- No unrelated rewrites outside the hotspots identified during the project review.

## Backend Design

### Repository Structure

Repositories currently mix query construction, result normalization, and infrastructure error mapping in the same methods. The refinement will split those concerns where doing so reduces method size and repeated logic.

Planned changes:

- Extract shared database error mapping for connection failures and reuse it across repository implementations.
- Keep repository public contracts stable.
- Replace `Promise<any>` with explicit domain or response types where the current behavior is clear.
- Move repeated mapping logic into small helpers near the repository or into shared infrastructure utilities when used by multiple modules.

### Controllers and Requests

Controllers currently use broad request types in authenticated routes. The refinement will introduce explicit request shapes for authenticated users and use them in article, comment, and user controllers.

Planned changes:

- Add a typed authenticated request contract.
- Replace controller-level `any` usage where the current request shape is known.
- Keep guards, decorators, status codes, and response shapes unchanged.

### Error Handling

Infrastructure error handling will be centralized enough to prevent drift between repositories while keeping domain errors readable at call sites.

Planned changes:

- Add a single helper for translating known database connection failures into `DBConnectionError`.
- Preserve existing unexpected-error behavior for unrecognized exceptions.
- Add focused tests for the helper if existing coverage does not already exercise the behavior.

### Testing

Backend verification will use the existing project commands. Because this environment has previously shown `pnpm` module purge prompts in non-TTY contexts, direct local binaries may be used only when they run the same checks without changing dependencies.

Required checks before backend completion:

- ESLint passes.
- Unit tests pass.
- E2E or CI coverage command passes with the local database/test prerequisites available; otherwise the exact missing prerequisite is reported.

## Frontend Design

### Remote Use Cases

Remote use cases currently repeat HTTP status mapping and error creation. The refinement will centralize common response handling while leaving individual use case behavior explicit.

Planned changes:

- Extract HTTP status/error mapping helpers for repeated cases such as unauthorized, forbidden, not found, and server error.
- Keep use case return models unchanged.
- Remove unnecessary `Promise.resolve` usage from async functions.
- Preserve endpoint paths and request payloads.

### Pages and Components

Several page components have accumulated rendering branches, card rendering, and page-specific state handling. The refinement will extract sections or subcomponents where that improves readability without changing the UI.

Planned changes:

- Split page-local rendering blocks into focused components when a page mixes unrelated visual sections.
- Keep extracted components near the page unless they become reusable across multiple pages.
- Avoid redesigning layouts, colors, spacing, or interaction behavior.
- Replace page-level `any` usage with domain model types.

### Test Utilities and Lint Exceptions

The frontend has some local lint suppressions and broad mock types. The refinement will remove avoidable suppressions by using explicit test helpers and typed mocks.

Planned changes:

- Replace avoidable `any` in tests with typed fixtures or narrow mock interfaces.
- Keep necessary test-environment shims localized and documented.
- Remove ESLint disables only when the replacement is clearer than the suppression.

### Testing

Required checks before frontend completion:

- ESLint passes.
- Unit/component tests pass.
- Production build passes.

## Data Flow and Behavior Preservation

The refinement must not change:

- API URLs.
- Request and response payload contracts.
- Authentication behavior.
- Article, comment, and favorite workflows.
- Frontend navigation and visible UI behavior.
- Seed and migration behavior for comments.

Any discovered behavior change must be treated as a regression unless the user explicitly approves it.

## Implementation Strategy

Work will be split into small commits by repository and concern:

1. Backend shared infrastructure/type refinement.
2. Backend repository/controller cleanup.
3. Frontend HTTP/use case cleanup.
4. Frontend page/component structure cleanup.
5. Final verification fixes.

Each step keeps tests runnable and preserves the current behavior.

## Acceptance Criteria

- Backend and frontend contain fewer broad `any` usages in production code.
- Repeated database connection error mapping is centralized in the backend.
- Repeated HTTP response/error mapping is centralized in the frontend.
- Large page/repository methods are smaller or delegated to focused helpers/components where the existing structure shows mixed responsibility.
- External behavior remains compatible with the current app.
- ESLint passes in both repositories.
- Relevant tests and builds pass, or any unavailable check is reported with the exact blocker.
- Semantic commits are written in English.
