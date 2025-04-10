import { IConfig } from './interface/config.interface';

export const config = (): IConfig => ({
  port: Number(process.env.PORT) || 80,
  secret: process.env.JWT_SECRET_KEY || 'secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET_KEY || 'refresh_secret',
  root: {
    name: process.env.ROOT_USER || 'admin',
    email: process.env.ROOT_EMAIL || 'admin',
    password: process.env.ROOT_PASSWORD || 'admin',
  },
});
