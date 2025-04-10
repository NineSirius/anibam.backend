import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseInit } from './database.init';

export const databaseProviders = [
  {
    isGlobal: true,
    imports: [ConfigModule],
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) =>
      //@ts-ignore
      new DataSource(configService.get('typeorm'))
        .initialize()
        .then((source) => databaseInit(source)),
    inject: [ConfigService],
  },
];
