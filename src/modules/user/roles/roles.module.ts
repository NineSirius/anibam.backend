import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { roleProviders } from './roles.provider';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [...roleProviders, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
