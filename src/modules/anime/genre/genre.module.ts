import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { genreProviders } from './genre.provider';
import { DatabaseModule } from 'src/core/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [GenreController],
  providers: [...genreProviders, GenreService],
})
export class GenreModule {}
