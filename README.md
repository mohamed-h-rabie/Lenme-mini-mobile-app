# Lenme Mini Mobile App

Full-stack authentication app with an Expo React Native client and a Node.js/Express API.

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB (local or Atlas)
- Android Studio and/or Expo Go (optional, for running on device/emulator)

### Backend Setup (`server`)

```bash
cd server
pnpm install
```

Create `server/config.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/lenme-auth
JWT_KEY=your_secret_key
JWT_EXPIRES=1h
JWT_EXPIRES_IN_MS=3600000
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

### Client Setup (`client`)

```bash
cd client
pnpm install
```

Create `client/.env`:

```env
EXPO_PUBLIC_API_BASE_URL=http://YOUR_LOCAL_IP:3000/api
```

Use your machine LAN IP (for example `192.168.1.5`) when the app runs on a real device.

## How To Run The App

1. Start backend:

```bash
cd server
pnpm run dev
```

2. Start Expo:

```bash
cd client
pnpm run start
```

3. Open target platform:

- Android: `pnpm run android` (inside `client`)
- iOS: `pnpm run ios` (inside `client`, macOS only)
- Web: `pnpm run web` (inside `client`)

## Mock Data

Example mock credentials:

- Email: `test@example.com`
- Password: `password123`

## Libraries Used

### Client

- Expo SDK 55 / React Native 0.83
- React Navigation (Native Stack + Bottom Tabs)
- TanStack Query
- React Hook Form + Zod
- Axios
- Expo Secure Store / Local Authentication

### Server

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (`jsonwebtoken`)
- `bcrypt`
- `nodemailer` for OTP email delivery

More detailed versioned dependencies are listed in `DEPENDENCIES.md`.

## Architecture Decisions

- Monorepo layout with separate `client` and `server` apps for independent iteration.
- Token-based auth: server returns JWT + expiry metadata; client stores token and expiry in secure/persistent storage via `SessionProvider`.
- API base URL injected via `EXPO_PUBLIC_API_BASE_URL` to avoid hardcoding local network values.
- Navigation guarded at the root level (`RootNavigator`) using authenticated vs unauthenticated stacks.
- Validation split by concern: client-side form validation (Zod + React Hook Form) and server-side request/domain validation.

## Assumptions Made

- OTP emails are sent through Gmail SMTP using an app password.
- Backend and client run on the same network during local development.
- `JWT_EXPIRES_IN_MS` matches `JWT_EXPIRES` behavior so client logout timing remains accurate.
- Current backend scope is user/auth endpoints only (no payments/advanced wallet backend yet).

## API Overview

All routes are under `/api/users`.

- `POST /signUp`
- `POST /signIn`
- `POST /verifyUser`
- `POST /requestNewOTP`
- `POST /forgetPassword`
- `POST /verifyResetPassword`
- `POST /resetPassword`
- `GET /me` (protected)
- `PATCH /updatePassword` (protected)
- `PATCH /updateMe` (protected, multipart with optional `photo`)
- `DELETE /deleteMe` (protected)

See `API_DOCS.md` for request and response details.
