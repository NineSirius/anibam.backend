import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnimeGenre } from './entities/anime-genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @Inject('GENRE_REPOSITORY') private genreRepository: Repository<AnimeGenre>,
  ) {}

  async getGenres() {
    const [genres, count] = await this.genreRepository.findAndCount();
    return { items: genres, count };
  }

  async createGenre(genreDto: CreateGenreDto) {
    const genre = await this.genreRepository.save(genreDto);
    return genre;
  }
}
