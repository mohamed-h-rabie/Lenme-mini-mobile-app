# API Documentation

Base prefix for all routes in this file: `/api/users`

## Public Authentication Endpoints

### `POST /signUp`

Create a new account and send OTP email.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

### `POST /signIn`

Sign in and receive a JWT token.

Request body:

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

Typical response:

```json
{
  "message": "You are successfully Logined",
  "token": "jwt_token_here",
  "expiresInMs": 3600000
}
```

### `POST /verifyUser`

Verify signup OTP.

Request body:

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

### `POST /requestNewOTP`

Request a new OTP for unverified account.

Request body:

```json
{
  "email": "john@example.com"
}
```

### `POST /forgetPassword`

Start password reset flow by sending OTP.

Request body:

```json
{
  "email": "john@example.com"
}
```

### `POST /verifyResetPassword`

Verify OTP for password reset.

Request body:

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

### `POST /resetPassword`

Set a new password after OTP verification.

Request body:

```json
{
  "email": "john@example.com",
  "password": "NewPassword123!"
}
```

## Protected Endpoints

These routes require:

`Authorization: Bearer <jwt-token>`

### `GET /me`

Get current user profile.

### `PATCH /updatePassword`

Update user password (authenticated user flow).

### `PATCH /updateMe`

Update current user profile data.

Expected content type:

`multipart/form-data` (supports optional `photo` upload)

### `DELETE /deleteMe`

Delete current user account.

## Notes

- This project currently exposes user/auth endpoints only.
- QR and WebSocket endpoints are not part of the active server routes in the current codebase.
