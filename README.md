# Expo + Node.js Authentication App

A full-stack mobile app with Expo (React Native) and a Node.js/Express API.  
The current implementation focuses on authentication, OTP verification, profile access, and account updates.

## Features

- Sign up, sign in, and email OTP verification.
- Forgot password flow with OTP reset verification.
- JWT-based protected routes (`/me`, account updates, password update).
- Biometric preference support on the client via SecureStore.
- Light and dark theme support.

## Tech Stack

### Frontend (`client`)

- Expo SDK 55 + React Native
- Expo Router (file-based routing)
- TanStack Query
- React Hook Form + Zod
- Axios
- Expo SecureStore

### Backend (`server`)

- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- JWT + bcrypt
- Nodemailer (OTP email flow)

## Quick Start

### 1) Backend

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

Run server:

```bash
pnpm run dev
```

### 2) Client

```bash
cd client
pnpm install
```

Update API host in `client/api/index.ts`:

```ts
export const BASE_IP = "YOUR_LOCAL_IP";
```

Run app:

```bash
npx expo start
```

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
- `PATCH /updateMe` (protected, multipart with `photo`)
- `DELETE /deleteMe` (protected)

For full request/response details, see `API_DOCS.md`.