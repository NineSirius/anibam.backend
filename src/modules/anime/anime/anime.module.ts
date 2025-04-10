import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { animeProviders } from './anime.provider';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [AnimeController],
  providers: [...animeProviders, AnimeService],
})
export class AnimeModule {}
