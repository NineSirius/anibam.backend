import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnimeDto } from './dto/create-title.dto';
import { Anime } from './entities/anime.entity';
import { HttpService } from '@nestjs/axios';
import slugify from 'slugify';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { GetAnimeFiltersDto } from './dto/get-anime-filters.dto';
import { map } from 'rxjs';

@Injectable()
export class AnimeService {
  constructor(
    @Inject('ANIME_REPOSITORY') private animeRepository: Repository<Anime>,
    private readonly httpService: HttpService,
  ) {}

  async createAnime(dto: CreateAnimeDto) {
    const { names } = dto;

    const anime = this.animeRepository.save({
      ...dto,
      slug: slugify(names.en, {
        lower: true,
        strict: true,
      }),
    });

    return anime;
  }

  async getAnime(params: GetAnimeFiltersDto) {
    const [anime, count] = await this.animeRepository.findAndCount({
      where: {},
      take: params?.limit,
    });
    return { items: anime, count };
  }

  async getAnimeById(id: number) {
    const anime = await this.animeRepository.findOne({ where: { id } });
    if (!anime) throw new NotFoundException(`Not found anime by id - '${id}'`);
    return anime;
  }

  async updateAnime(id: number, data: UpdateAnimeDto) {
    const anime = await this.animeRepository.findOneBy({ id });
    if (!anime) throw new NotFoundException('Anime not found');
    Object.assign(anime, data);
    return await this.animeRepository.save(anime);
  }

  getAnimeByShikimoriId(id: number) {
    const title = this.httpService
      .get(`https://shikimori.one/api/animes/${id}`)
      .pipe(map((resp) => resp.data));

    if (!title) throw new NotFoundException();

    return title;
  }

  createFromShikimori(id: number) {
    return this.getAnimeByShikimoriId(id).pipe(
      map(async (shikimoriTitle) => {
        const alternativesNames = [];

        shikimoriTitle.english.map((name) => alternativesNames.push(name));
        shikimoriTitle.japanese.map((name) => alternativesNames.push(name));
        shikimoriTitle.synonyms.map((name) => alternativesNames.push(name));

        const title = {
          names: {
            ru: shikimoriTitle.russian,
            en: shikimoriTitle.name,
            alternatives: alternativesNames,
          },
          poster: shikimoriTitle?.image?.original
            ? `https://shikimori.one${shikimoriTitle.image.original}`
            : null,
          shikimori_id: shikimoriTitle.id,
          episodes: shikimoriTitle.episodes,
          episodes_aired: shikimoriTitle.episodes_aired,
          status: shikimoriTitle.status,
          score: shikimoriTitle.score,
          type: shikimoriTitle.type,
          description: shikimoriTitle.description,
          aired_on: shikimoriTitle.aired_on,
          released_on: shikimoriTitle.released_on,
        };

        const createdTitle = await this.animeRepository.save({
          ...title,
          slug: slugify(title.names.en, {
            lower: true,
            strict: true,
          }),
        });

        return createdTitle;
      }),
    );
  }

  async deleteAnime(id: number) {
    await this.animeRepository.delete(id);
    return { status: 'success' };
  }
}
