# PulseX Frontend

PulseX Frontend is a React-based web application for a heart-care platform that serves three main user roles:

- Patients
- Doctors
- Admins

The application provides authentication flows, dashboards, appointment and story workflows, AI-powered heart risk presentation, reporting screens, and responsive UI experiences built with Tailwind CSS.

## Live Demo

Production URL:

- https://versionpulsex1.vercel.app/

## Tech Stack

- React 19
- Vite 7
- React Router
- Tailwind CSS 4
- Axios
- Formik + Yup
- Framer Motion
- Recharts
- Flowbite React
- Swiper
- React Icons

## Project Structure

The project follows a feature-first structure under `src/features` and separates reusable UI into `src/components`.

```text
src/
	components/          # Shared reusable components (Layout, Navbar, Footer, etc.)
	features/
		admin/             # Admin feature modules (dashboard, management, reports)
		auth/              # Login, Register, Forgot Password
		doctor/            # Doctor dashboard and layout
		home/              # Home page sections
		patient/           # Patient modules (risk, booking, stories, records, etc.)
	hooks/               # Shared hooks
	schemas/             # Validation schemas
	store/               # State/store setup
	App.jsx              # Route definitions and app shell
	main.jsx             # React app bootstrap
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

By default, Vite starts the app at:

- http://localhost:5173

## Available Scripts

- `npm run dev` - Start the local development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks

## Routing Overview

The app uses role-based route groups:

- `/` for the public home page
- `/login`, `/register`, `/forgot-password` for authentication
- `/admin/*` for admin pages
- `/patient/*` for patient pages
- `/doctor/*` for doctor pages

Routes are lazy-loaded where applicable and wrapped with `Suspense` for better loading behavior.

## Build and Deployment

### Production Build

```bash
npm run build
```

The output is generated in:

- `dist/`

### Preview Build Locally

```bash
npm run preview
```

### Deployment

This project is deployed on Vercel:

- https://versionpulsex1.vercel.app/

## Code Quality

- ESLint is configured in `eslint.config.js`
- Consistent utility-first styling with Tailwind CSS
- Feature-first folder organization for scalability

## Notes

- This repository currently uses JavaScript (not TypeScript).
- If environment variables are required in the future, place them in `.env` files using the `VITE_` prefix.

## License

This project is intended for academic/product development use. Add your final license choice before public distribution.
