# Accessibility Toolbar Design

## Goal

Add a compact fixed toolbar on the right side of the frontend so users can access accessibility controls from every route.

## Scope

- Render the toolbar globally from the app router.
- Provide color-vision filter options for default, protanopia, deuteranopia, tritanopia, and monochrome.
- Persist the selected color-vision mode in `localStorage`.
- Provide a VLibras action that loads the official VLibras widget script on demand.
- Keep the UI compact, keyboard-accessible, and usable on mobile and desktop.

## Architecture

Create a focused `AccessibilityToolbar` atom. The component owns browser-side effects for `localStorage`, document classes, and VLibras script injection. The router renders it outside the route tree so it stays visible across pages.

CSS classes in `src/main/index.css` apply color-vision filters through `html.accessibility-color-*`. This keeps page components unchanged and makes the feature reversible by switching classes.

## Testing

Component tests cover rendering, changing the color-vision mode, persistence, document class updates, and VLibras script injection. The implementation is frontend-only and does not require backend changes.
