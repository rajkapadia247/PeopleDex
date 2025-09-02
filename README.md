# PeopleDex UI — Modern Contact Book (React)

A clean, responsive UI for **PeopleDex**, a modern contact book. Users can sign up/sign in (including **Google**), **add & view contacts**, **search** their network, and attach **profile pictures** to people. This repo contains the **front-end**; it talks to a Node/Express API backed by MongoDB.

🔗 **Live:** https://peopledex.space/

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Development notes](#development-notes)
- [API contract (UI-level)](#api-contract-ui-level)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Authentication:** Email/password + **Google OAuth 2.0 sign-in**
- **Contacts Management:** Create, read, update, delete contacts
- **Favorites System:** Mark and filter favorite contacts
- **Search & Filtering:** Real-time search with debounced API calls
- **Profile Pictures:** Upload and preview contact avatars
- **Responsive Design:** Mobile-first layouts with sidebar navigation
- **Tab Navigation:** Switch between "All Contacts" and "Favorites" views
- **Form Validation:** Client-side validation with error handling

---

## Tech stack

- **React 18** with TypeScript
- **Vite** for build tooling and dev server
- **React Router v6** for client-side routing
- **Axios** for API calls (see `src/helpers/axios.ts`)
- **CSS Modules** for component styling
- **Context API** for state management (Auth, Active Tab, Refresh Data)
- **Node/Express + MongoDB** backend (separate repo)

---

## Getting started

### Prerequisites

- **Node.js** 18+ and **npm** (or **yarn/pnpm**)

### 1) Clone & install

```bash
git clone https://github.com/<you>/<repo-name>.git
cd <repo-name>
npm install
```

### 2) Configure environment

Create a `.env` file in the project root (see [Environment variables](#environment-variables)).

### 3) Run the app

```bash
npm run dev
```

The app will start on **http://localhost:5173** (Vite's default port).

**Build for production:**

```bash
npm run build
npm run preview
```

---

## Environment variables

> Use the prefix that matches your tooling:
>
> - **Vite** → `VITE_...`

Create `.env` with:

```
# Base URL of your backend API (no trailing slash)
VITE_API_URL=https://api.yourdomain.com

# Google OAuth (front-end client ID for the Google button/SDK)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

**Where they’re used**

- `API_URL` is used by the API client to build requests.
- `GOOGLE_CLIENT_ID` is used for rendering the Google sign-in button / initializing the Google SDK (if applicable).
- Any secrets (keys, tokens) should **not** be committed; use `.env`, CI secrets, or host-level config.

---

## Project structure

```
src/
  components/
    atoms/              # Basic UI components (Button, Input, Avatar, etc.)
    molecules/          # Composite components (Search, Forms, Cards)
    organisms/          # Complex components (ContactListTable, MainView)
    pages/              # Page-level components (Login, Register, ContactsPage)
  contexts/             # React Context providers (Auth, ActiveTab, RefreshData)
  helpers/              # Axios configuration and interceptors
  routes/               # Routing configuration and protected routes
  types/                # TypeScript interfaces and types
  utils/                # Utility functions and API helpers
  main.tsx              # Application entry point
  App.tsx               # Root component with providers
```

---

## Development notes

### Authentication flow

- **Email/password**: Standard form submission to `/auth/login` and `/auth/register`
- **Google OAuth 2.0**: Frontend obtains access token and sends to `/auth/google/verify` for verification
- **Token storage**: JWT tokens stored in localStorage and sent via Authorization headers
- **Auto-logout**: Automatic redirect to login on 401 responses

### Contact management

- **Form validation**: Client-side validation for required fields and email format
- **Picture upload**: File input with preview for contact avatars
- **Favorites system**: Toggle favorite status with tab-based filtering
- **Real-time search**: Debounced search with API calls to filter contacts

### State management

- **Context API**: Centralized state for authentication, active tabs, and data refresh
- **Lazy loading**: Route-based code splitting for better performance
- **Responsive design**: Mobile-first approach with sidebar navigation

---

## API contract (UI-level)

> The **UI** expects the backend to expose endpoints similar to:

**Auth**

- `POST /auth/register` → `{ userData: { token, user } }`
- `POST /auth/login` → `{ token, user }`
- `POST /auth/google/verify` → `{ userData: { token, user } }` (with Google ID token)
- `GET /auth/me` → `{ user }`

**Contacts**

- `GET /contacts?search=<q>` → `Contact[]`
- `POST /contacts` → `Contact`
- `GET /contacts/:id` → `Contact`
- `PUT /contacts/:id` → `Contact`
- `DELETE /contacts/:id` → `{ ok: true }`

**Contact shape (example)**

```ts
type Contact = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  picture?: string;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
};

---

## Roadmap
- [x] Email/password authentication
- [x] Google OAuth 2.0 sign-in
- [x] Contacts CRUD operations
- [x] Real-time search with debouncing
- [x] Profile pictures (upload + preview)
- [x] Favorites system with tab filtering
- [x] Responsive design with sidebar navigation
- [x] Form validation and error handling
- [x] Lazy loading and code splitting
- [ ] Tags/labels & advanced filtering
- [ ] Import/export (CSV)
- [ ] Bulk actions
- [ ] Dark mode theme
- [ ] Unit tests & E2E testing

---

## Contributing
1. Fork the repo and create a feature branch: `git checkout -b feat/your-feature`
2. Commit with clear messages: `git commit -m "feat(search): add fuzzy match"`
3. Push and open a PR.

Please include screenshots or short clips for UI changes.

---

## License
This project is licensed under the **MIT License**. See `LICENSE` for details.

---

### Credits
Built with ❤️ as part of **PeopleDex**, a modern, privacy-minded contact book.
```
