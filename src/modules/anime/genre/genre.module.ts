import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { genreProviders } from './genre.provider';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GenreController],
  providers: [...genreProviders, GenreService],
})
export class GenreModule {}
