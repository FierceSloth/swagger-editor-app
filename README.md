# 📐 Swagger/OpenAPI UI

<img width="1920" height="915" alt="image" src="https://github.com/user-attachments/assets/793652ca-e09b-455d-b80a-818550cec207" />
<img width="1920" height="915" alt="image" src="https://github.com/user-attachments/assets/9ed51239-115d-45ba-84da-a19a922c9e61" />
<img width="1920" height="915" alt="image" src="https://github.com/user-attachments/assets/c4b34908-f9c2-4b84-9f2e-c544f5576f19" />


🔗 **[Live Application (Deploy)](https://swagger-editor-app-gmt.vercel.app/en/home)** | 🎬 **[Demo Video](https://youtu.be/MxXD0E_D5gs)**

[![Trello Board](https://img.shields.io/badge/Trello-Board-blue?style=for-the-badge&logo=trello)](https://trello.com/invite/b/6a3a2c08cbf3b78041de64fc/ATTIf45708f8f236db347d8cf45494ed3ebdC515C479/swager-3-недели)
[![Miro Board](https://img.shields.io/badge/Miro-Board-yellow?style=for-the-badge&logo=miro)](https://miro.com/app/board/uXjVHCMEeJE=/)

**Swagger/OpenAPI UI** is a full-stack web application for editing, validating, and testing REST APIs using OpenAPI specifications — all within a single, polished interface. Developed as the final group project for the **[RS School](https://rs.school/)** Frontend course (React module), it combines a powerful code editor with real-time Spectral linting, an interactive API documentation viewer, and a built-in REST client with request analytics.

The application is built with **Next.js 16 (App Router)**, follows strict **Feature-Sliced Design (FSD)** architecture, and features full server-side rendering, Supabase-powered authentication with Zod validation, and internationalization — all without a single `@ts-ignore`.

> 📋 **Task Description & Evaluation Criteria:** [RS School Final Task — Swagger/OpenAPI UI](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md)

---

## ✨ Key Features

### 📝 Swagger Editor

- **CodeMirror Integration** — Syntax-highlighted code editor with the Dracula theme and full JSON/YAML language support via `@uiw/react-codemirror`.
- **Format Auto-Detection** — Automatically detects whether the input is JSON or YAML.
- **JSON ↔ YAML Conversion** — One-click format switching with zero data loss via a dedicated `FormatToggle` toolbar component.
- **Spectral OAS Linting** — Real-time OpenAPI schema validation using `@stoplight/spectral-core` with a custom **Spectral-to-CodeMirror diagnostic bridge** that maps errors, warnings, info, and hints directly onto editor line annotations with a validation feedback panel.
- **Swagger 2.0 → OpenAPI 3.0** — Automatic conversion of legacy Swagger 2.0 specs.
- **Schema Persistence** — Authenticated users' schemas are debounce-autosaved (1s) to Supabase and restored on next login.

### 🔍 Swagger Viewer

- **Endpoint Explorer** — All API endpoints organized by path and grouped by tags, color-coded by HTTP method (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS).
- **Parameter Display** — Full details for path, query, header, and cookie parameters rendered in structured tables.
- **Request & Response Schemas** — Renders JSON Schema definitions with auto-generated example payloads and all status codes.
- **Markdown Descriptions** — Server info and API descriptions rendered as rich markdown via `react-markdown`.
- **Responsive Split View** — Editor and Viewer side-by-side in landscape, stacked in portrait orientation.

### ⚡ Try-It-Out (REST Client)

- **Interactive Request Builder** — Fill in path, query, header, and cookie parameters, plus the request body directly in the UI. URL is dynamically built with path parameter interpolation and query string assembly.
- **Server-Side Proxy** — All requests are executed through a Next.js API route (`/api/proxy`) with a 10-second timeout, header sanitization, and automatic CORS bypass.
- **Response Inspector** — Displays response status code, headers, and auto-formatted body (pretty JSON).
- **cURL Generator** — Generate and copy-to-clipboard cURL commands from the current request state.
- **Automatic Audit Logging** — For authenticated users, every request's metadata (URL, method, status, duration, request/response sizes, errors) is logged to Supabase.

### 📊 History & Analytics (SSR)

- **Server-Side Rendered** — History page is fully generated on the server before reaching the client.
- **Request Analytics** — Tracks and displays: request duration, response status code, timestamp, HTTP method, request/response sizes, error details, and endpoint URL.
- **Chronological Feed** — Requests sorted by timestamp (most recent first) as history request cards.
- **Lazy-Loaded** — Code for the history module is not downloaded until the user navigates to it.
- **Empty State** — Informational message with navigation shortcuts to the editor/viewer when no requests have been made.

### 🔐 Authentication & Security

- **Supabase Auth** — Email/password registration and login with secure session management via `@supabase/ssr` Server Actions.
- **Zod + React Hook Form** — Client-side validation with type-safe schemas (email format, password strength: min 8 chars, letter, digit, special character, Unicode support). Uses `useTransition` for smooth non-blocking submissions.
- **Localized Error Handling** — Supabase auth error codes (`invalid_credentials`, `user_already_exists`, `over_request_rate_limit`) are mapped to user-friendly localized messages.
- **Route Protection** — Middleware-level guards: unauthenticated users are redirected from protected routes (`/history`) to `/home`; authenticated users are redirected from auth routes (`/login`, `/register`) to `/home`.
- **Token Expiry Handling** — Automatic session refresh and redirect when tokens expire or become invalid.

### 🌍 Internationalization (i18n)

- **2 Languages** — Full English and Russian localization via `next-intl`.
- **Language Switcher** — Toggle in the header, with locale-aware path-prefix routing (`/en/...`, `/ru/...`) that preserves application state.

### 🎨 UI & UX Polish

- **Futuristic Dark Theme** — Custom SCSS design system with design tokens, grid overlay, glowing elements, and glassmorphism card aesthetics (`GlassCard` component).
- **Radix UI Primitives** — Accessible, unstyled UI primitives for Accordion and other interactive elements.
- **Custom Icon System** — `lucide-react` icons throughout the interface.
- **Sticky Header** — Animated sticky header with scroll-triggered dynamic styling via `HeaderScrollListener`.
- **Toast Notifications** — User-friendly error and success messages via `react-hot-toast`.
- **Error Boundary** — Graceful error handling with fallback UI for unhandled exceptions.
- **Animated Background** — SVG-based `ArcBackground` component with arc and circle animations.
- **Loading States** — Spinner component for async transitions.
- **Custom 404 & Error Pages** — Styled not-found and error pages.

---

## 🏗️ Technical Architecture

The project follows **Feature-Sliced Design (FSD)** — a modern architectural methodology that enforces strict unidirectional dependency flow: `pages → widgets → features → entities → shared`.

```
src/
├── app/         → Global styles (SCSS variables, mixins, constants, base reset)
├── pages/       → Page-level compositions (Home, About, History, Login, Register)
├── widgets/     → Complex UI blocks (Header, Footer, SwaggerEditor, SwaggerViewer)
├── features/    → Business logic slices (Auth, FormatConverter, SchemaValidator, History, etc.)
├── entities/    → Domain models (Endpoint — types, grouping, method badge, parameter display)
└── shared/      → Reusable UI kit, Supabase clients, i18n config, hooks, types
```

### Architectural Highlights

- **Next.js 16 App Router** — File-system routing with React Server Components and Server Actions.
- **React 19** — Latest React with concurrent features.
- **FSD Path Aliases** — Clean imports via `@shared/`, `@features/`, `@entities/`, `@widgets/`, `@pages/` TypeScript path aliases.
- **Dual SSR & Client Auth** — Supabase SSR client with cookies for server components/middleware, while `AuthProvider` context keeps client UI reactively updated via `onAuthStateChange`.
- **Spectral ↔ CodeMirror Bridge** — Custom integration mapping Stoplight Spectral OpenAPI diagnostics directly to CodeMirror 6 line-level annotations.
- **Secure CORS Proxy with Audit Logging** — Catch-all API route with 10s timeout, header sanitization, and automatic request metadata logging to Supabase for authenticated users.
- **Debounced Autosave & Live Parsing** — 1-second debounce on schema parsing and Supabase persistence to prevent UI freezing.
- **Middleware Stack** — Combines `next-intl` locale routing + Supabase session refresh + route protection in a single middleware chain.
- **SCSS Modules** — Scoped component styling with a centralized design system (`_constants.scss`, `_mixins.scss`).
- **Barrel Exports** — Clean public API for every module via `index.ts` re-exports.
- **CI/CD Pipeline** — GitHub Actions workflow running lint, format checks, and tests on every push/PR.

---

## 💻 Tech Stack

| Category            | Technologies                                               |
| :------------------ | :--------------------------------------------------------- |
| **Framework**       | Next.js 16 (App Router, Webpack)                           |
| **Core**            | React 19, TypeScript 5                                     |
| **Styling**         | SCSS (CSS Modules), CSS Custom Properties                  |
| **UI Primitives**   | Radix UI, Lucide React                                     |
| **Code Editor**     | CodeMirror 6 (`@uiw/react-codemirror`, Dracula theme)      |
| **Schema Linting**  | Stoplight Spectral (`@stoplight/spectral-core`)            |
| **Form Validation** | Zod, React Hook Form                                       |
| **Auth & Backend**  | Supabase (Auth + PostgreSQL)                               |
| **i18n**            | next-intl                                                  |
| **Schema Parsing**  | yaml (YAML ↔ JSON)                                        |
| **Notifications**   | react-hot-toast                                            |
| **Testing**         | Vitest, @testing-library/react, MSW, jsdom, v8 coverage    |
| **Code Quality**    | ESLint 9 (flat config), Prettier, Husky, lint-staged, Commitlint |
| **CI/CD**           | GitHub Actions (lint + format + tests)                     |

---

## 👥 Our Team — GMT+5 Development

| Name         | Role                  | GitHub                                                 | LinkedIn                                                                |
| :----------- | :-------------------- | :----------------------------------------------------- | :---------------------------------------------------------------------- |
| **Alexei**   | Mentor                | [@lexarudak](https://github.com/lexarudak)             | [LinkedIn](https://www.linkedin.com/in/aliaksei-rudak/)                 |
| **Dastan**   | Team Lead / Developer | [@FierceSloth](https://github.com/FierceSloth)         | [LinkedIn](https://www.linkedin.com/in/dastan-hairushev-482848321/)     |
| **Meruert**  | Developer             | [@merucoding](https://github.com/merucoding)           | [LinkedIn](https://www.linkedin.com/in/meruert-amantay)                 |
| **Anna**     | Developer             | [@dilmun1101](https://github.com/dilmun1101)           | [LinkedIn](https://www.linkedin.com/in/anna-nitsevich-40102a405/)       |

---

## 📚 Documentation

- 🔄 [**Git Flow & Collaboration**](./docs/CONTRIBUTING.md) — Branch naming conventions, commit standards, PR templates, and squash merge strategy.

---

## ✨ Featured Pull Requests

Highlighted pull requests showcasing our development process:

- 🔗 [PR #16: Swagger Editor](https://github.com/FierceSloth/swagger-editor-app/pull/16)
- 🔗 [PR #36: Swagger Viewer](https://github.com/FierceSloth/swagger-editor-app/pull/36)
- 🔗 [PR #45: History & Analytics (SSR)](https://github.com/FierceSloth/swagger-editor-app/pull/45)
- 🔗 [PR #44: About Page](https://github.com/FierceSloth/swagger-editor-app/pull/44)
- 🔗 [PR #42: Testing](https://github.com/FierceSloth/swagger-editor-app/pull/42)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/FierceSloth/swagger-editor-app.git

# Navigate to the project directory
cd swagger-editor-app

# Install dependencies
npm install
```

### 🔑 Required Environment Variables

To run the application locally (enabling authorization, history logging, and CORS proxying), you **must** configure the Supabase keys. Without them, the local server will throw a `Missing environment variable` error.

1. Create a `.env` (or `.env.local`) file in the root directory of the project.
2. Add the following lines to it:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tjauezlydekhtstcmymw.supabase.co/
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_Y8crjslJ7ozxW3X6z-DJQw_sFsROSKo
```

3. Once configured, start the development server:

```bash
npm run dev
```

### Other Commands

```bash
# Run tests with coverage
npm run test:coverage

# Lint & format
npm run validate

# Production build
npm run build
npm start
```
---

_Built with ❤️ by **GMT+5 Development**_
