import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnimeDto } from './dto/create-title.dto';
import { Anime } from './entities/anime.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AnimeService {
  constructor(
    @Inject('ANIME_REPOSITORY') private animeRepository: Repository<Anime>,
    private readonly httpService: HttpService,
  ) {}

  async createAnime(dto: CreateAnimeDto) {
    const anime = await this.animeRepository.save(dto);
    return anime;
  }

  async getAnime() {
    const [anime, count] = await this.animeRepository.findAndCount();
    return { items: anime, count };
  }

  getAnimeByShikimoriId(id: number) {
    const title = this.httpService.get(
      `https://shikimori.one/api/animes/${id}`,
    );
    console.log(title);

    if (!title) return NotFoundException;

    return title;
  }

  async deleteAnime(id: number) {
    await this.animeRepository.delete(id);
    return { status: 'success' };
  }
}
