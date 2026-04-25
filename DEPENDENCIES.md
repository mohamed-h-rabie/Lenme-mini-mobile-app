# Versions & Dependencies

This file reflects the current dependency versions in:

- `server/package.json`
- `client/package.json`

## Backend (`server`)

### Runtime Dependencies

- `bcrypt`: ^6.0.0
- `cors`: ^2.8.5
- `dotenv`: ^17.2.3
- `express`: ^4.21.2
- `jsonwebtoken`: ^9.0.2
- `mongoose`: ^8.19.1
- `morgan`: ^1.10.1
- `multer`: ^2.0.2
- `nodemailer`: ^7.0.10
- `otp-generator`: ^4.0.1
- `qs`: ^6.14.0
- `slugify`: ^1.6.6

### Dev Dependencies

- `@types/express`: ^5.0.5
- `@types/morgan`: ^1.9.10
- `@types/node`: ^24.10.0
- `@types/qs`: ^6.14.0
- `nodemon`: ^3.1.10
- `typescript`: ^5.9.3

### Architectural Role

- Express + Mongoose provide a simple layered API service for auth and profile operations.
- `jsonwebtoken` + `bcrypt` are used for stateless auth and password hashing.
- `nodemailer` + `otp-generator` drive OTP verification and password reset flows.

## Frontend (`client`)

### Runtime Dependencies

- `@expo/metro-runtime`: ^55.0.9
- `@expo/vector-icons`: ^15.0.3
- `@hookform/resolvers`: ^5.2.2
- `@react-native-async-storage/async-storage`: 2.2.0
- `@react-navigation/bottom-tabs`: ^7.4.0
- `@react-navigation/elements`: ^2.6.3
- `@react-navigation/native`: ^7.1.8
- `@tanstack/react-query`: ^5.90.11
- `axios`: ^1.13.2
- `expo`: ~55.0.11
- `expo-constants`: ~55.0.11
- `expo-dev-client`: ~55.0.22
- `expo-font`: ~55.0.6
- `expo-haptics`: ~55.0.12
- `expo-image`: ~55.0.8
- `expo-linking`: ~55.0.11
- `expo-local-authentication`: ~55.0.11
- `expo-network`: ~55.0.12
- `expo-router`: ~55.0.10
- `expo-secure-store`: ^55.0.11
- `expo-splash-screen`: ~55.0.15
- `expo-status-bar`: ~55.0.5
- `expo-symbols`: ~55.0.7
- `expo-system-ui`: ~55.0.13
- `expo-web-browser`: ~55.0.12
- `lucide-react-native`: ^0.553.0
- `moti`: ^0.30.0
- `react`: 19.2.0
- `react-dom`: 19.2.0
- `react-hook-form`: ^7.66.0
- `react-native`: 0.83.4
- `react-native-gesture-handler`: ~2.30.1
- `react-native-otp-entry`: ^1.8.5
- `react-native-reanimated`: ~4.2.1
- `react-native-safe-area-context`: ~5.6.0
- `react-native-screens`: ~4.23.0
- `react-native-svg`: 15.15.3
- `react-native-svg-transformer`: ^1.5.2
- `react-native-web`: ~0.21.0
- `react-native-worklets`: 0.7.2
- `zod`: ^4.1.12

### Dev Dependencies

- `@types/react`: ~19.2.14
- `eslint`: ^9.39.1
- `eslint-config-expo`: ~55.0.0
- `eslint-plugin-unused-imports`: ^4.4.1
- `typescript`: ~5.9.2

### Architectural Role

- React Navigation organizes authenticated vs unauthenticated routes and app tabs.
- TanStack Query centralizes async server state and request lifecycle handling.
- React Hook Form + Zod keep forms declarative with schema-based validation.
- Axios provides a single API client configured by `EXPO_PUBLIC_API_BASE_URL`.

## Assumptions Made

- Dependency versions are pinned/ranged for compatibility with Expo SDK 55.
- Node.js 18+ and pnpm are used consistently across team machines.
- No additional private packages are required to run current app features.
