# Accessibility Toolbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a compact fixed accessibility toolbar with color-vision modes and VLibras access across the frontend.

**Architecture:** Create a single `AccessibilityToolbar` atom that handles UI state, document color-filter classes, `localStorage`, and VLibras script injection. Render it once from `src/main/navigation/router.tsx` so every route gets the toolbar.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, Tailwind CSS, lucide-react.

---

### Task 1: Accessibility Toolbar Component

**Files:**
- Create: `src/presentation/components/atoms/AccessibilityToolbar.tsx`
- Create: `src/presentation/components/atoms/AccessibilityToolbar.spec.tsx`
- Modify: `src/presentation/components/atoms/index.ts`

- [ ] **Step 1: Write the failing test**

Create `AccessibilityToolbar.spec.tsx` with tests that render the toolbar, select `Protanopia`, assert `localStorage` receives `mind-blog-color-vision-mode`, assert `document.documentElement` receives `accessibility-color-protanopia`, and click `VLibras` to assert the script is appended once.

- [ ] **Step 2: Run the component test to verify it fails**

Run: `npm test -- --run src/presentation/components/atoms/AccessibilityToolbar.spec.tsx`

Expected: FAIL because `AccessibilityToolbar` does not exist.

- [ ] **Step 3: Implement the component**

Create a compact fixed vertical toolbar with icon buttons, a native `select` for color-vision modes, and a VLibras button. Use `Palette` and `Languages` from `lucide-react`. Keep all effects guarded for browser APIs.

- [ ] **Step 4: Run the component test to verify it passes**

Run: `npm test -- --run src/presentation/components/atoms/AccessibilityToolbar.spec.tsx`

Expected: PASS.

### Task 2: Global Mount and Styles

**Files:**
- Modify: `src/main/navigation/router.tsx`
- Modify: `src/main/index.css`
- Test: `src/presentation/components/atoms/AccessibilityToolbar.spec.tsx`

- [ ] **Step 1: Add global CSS**

Add `html.accessibility-color-*` filter classes to `src/main/index.css` for protanopia, deuteranopia, tritanopia, and monochrome.

- [ ] **Step 2: Mount globally**

Import `AccessibilityToolbar` in `router.tsx` and render it next to `BrowserRouter` so it remains visible across all routes.

- [ ] **Step 3: Run focused and full verification**

Run: `npm test -- --run src/presentation/components/atoms/AccessibilityToolbar.spec.tsx`

Run: `npm run build`

Expected: both commands complete successfully.

## Self-Review

- Spec coverage: global rendering, color-vision modes, persistence, VLibras loading, and tests are covered.
- Placeholder scan: no TODO, TBD, or open-ended implementation steps.
- Type consistency: component name, storage key, CSS class prefix, and file paths are consistent.
