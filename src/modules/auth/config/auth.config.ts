import { registerAs } from '@nestjs/config';

export type AuthConfig = {
  secret: string;
  expires: string;
};

export const authConfig = registerAs<AuthConfig>('auth', () => {
  const secret = process.env.AUTH_JWT_SECRET;
  const expires = process.env.AUTH_JWT_TOKEN_EXPIRES_IN;

  if (!secret) {
    throw new Error('Missing environment variable: AUTH_JWT_SECRET');
  }

  if (!expires) {
    throw new Error('Missing environment variable: AUTH_JWT_TOKEN_EXPIRES_IN');
  }

  return {
    secret,
    expires,
  };
});
