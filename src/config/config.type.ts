import { DatabaseConfig } from 'src/database/config/database.config';
import { AppConfig } from './app.config';
import { AuthConfig } from 'src/modules/auth/config/auth.config';

export type AllConfig = {
  database: DatabaseConfig;
  app: AppConfig;
  auth: AuthConfig;
};
