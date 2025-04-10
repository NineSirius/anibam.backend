import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimeModule } from './modules/anime/anime/anime.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/user/users/users.module';
import { RolesModule } from './modules/user/roles/roles.module';
import { AuthModule } from './modules/user/auth/auth.module';
import { config } from './core/config';
import typeorm from './core/config/typeorm';
import { GenreModule } from './modules/anime/genre/genre.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServerErrorValidationInterceptor } from './utils/validation/server-error-validation.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, typeorm],
    }),
    AnimeModule,
    GenreModule,
    RolesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ServerErrorValidationInterceptor,
    },
  ],
})
export class AppModule {}
