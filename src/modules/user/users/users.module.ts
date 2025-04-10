import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module';
import { userProviders } from './users.provider';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  imports: [RolesModule, DatabaseModule],
  exports: [UsersService],
})
export class UsersModule {}
