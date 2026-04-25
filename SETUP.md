# Setup Instructions

Follow these steps to run the project locally.

## Prerequisites

- Node.js 18+
- pnpm
- MongoDB (local or Atlas)
- Expo Go (optional, for device testing)

## 1) Backend Setup (`server`)

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

Run the backend:

```bash
pnpm run dev
```

Server base URL: `http://localhost:3000`

## 2) Client Setup (`client`)

```bash
cd client
pnpm install
```

Create `client/.env` and set:

```env
EXPO_PUBLIC_API_BASE_URL=http://YOUR_LOCAL_IP:3000/api
```

Use your machine LAN IP (for example `192.168.1.5`) when running on a phone or emulator connected over network. `localhost` works only when both client and server share the same host runtime.

Start Expo:

```bash
npx expo start
```

Useful shortcuts in Expo terminal:

- `a` => open Android
- `i` => open iOS
- `w` => open web

## Mock Data

Example mock credentials:

- Email: `test@example.com`
- Password: `password123`

## Quick Troubleshooting

- If API calls fail on device, re-check `EXPO_PUBLIC_API_BASE_URL` in `client/.env`.
- Ensure server and phone/emulator are on the same network.
- Verify MongoDB is running before starting backend.

## Architecture Decisions (Setup Related)

- Runtime config is environment-based (`config.env` on server, `.env` on client) to avoid code edits per machine.
- Backend is launched independently from frontend to keep local debugging straightforward.
- Client uses JWT expiry metadata from server to manage session timeout behavior.

## Assumptions Made

- You have access to a MongoDB instance before starting the API.
- You can provide valid Gmail SMTP credentials for OTP emails.
- `pnpm` is installed globally and available in terminal PATH.
