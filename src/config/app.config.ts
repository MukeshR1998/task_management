import { registerAs } from '@nestjs/config';

export type AppConfig = {
  port: string;
  nodeEnv: string;
};

export const appConfig = registerAs<AppConfig>('app', () => {
  const port = process.env.APP_PORT;
  const nodeEnv = process.env.NODE_ENV;

  if (!port) {
    throw new Error('Missing environment variable: APP_PORT');
  }

  if (!nodeEnv) {
    throw new Error('Missing environment variable: NODE_ENV');
  }

  return {
    port,
    nodeEnv,
  };
});
