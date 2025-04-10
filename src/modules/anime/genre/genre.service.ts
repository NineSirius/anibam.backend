import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnimeGenre } from './entities/anime-genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { HttpService } from '@nestjs/axios';
import slugify from 'slugify';
import { map } from 'rxjs';

@Injectable()
export class GenreService {
  constructor(
    @Inject('GENRE_REPOSITORY') private genreRepository: Repository<AnimeGenre>,
    private readonly httpService: HttpService,
  ) {}

  async getGenres() {
    const [genres, count] = await this.genreRepository.findAndCount();
    return { items: genres, count };
  }

  async createGenre(genreDto: CreateGenreDto) {
    const genre = await this.genreRepository.save(genreDto);
    return genre;
  }

  createFromShikimori() {
    return this.httpService.get(`https://shikimori.one/api/genres`).pipe(
      map(async (resp) => {
        const shikimoriGenres = resp.data.map((genre) => ({
          name: genre.russian,
          slug: slugify(genre.name, { lower: true, strict: true }),
        }));

        let addedCount = 0;
        let errorCount = 0;

        await shikimoriGenres.map(async (genre) => {
          try {
            await this.genreRepository.save(genre);
            addedCount++;
          } catch {
            errorCount++;
          }
        });

        return {
          status: 'success',
          message: `Было создано ${addedCount} жанров. \nНе удалость добавить ${errorCount} жанров.`,
        };
      }),
    );
    // return { status: 'success', message: 'Было создано 0 жанров' };
  }
}
