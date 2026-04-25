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

Edit `client/api/index.ts` and set:

```ts
export const BASE_IP = "YOUR_LOCAL_IP";
```

Use your machine LAN IP (for example `192.168.1.5`) when running on a phone or emulator connected over network.

Start Expo:

```bash
npx expo start
```

Useful shortcuts in Expo terminal:

- `a` => open Android
- `i` => open iOS
- `w` => open web

## Quick Troubleshooting

- If API calls fail on device, re-check `BASE_IP` in `client/api/index.ts`.
- Ensure server and phone/emulator are on the same network.
- Verify MongoDB is running before starting backend.
