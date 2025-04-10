import { DataSource } from 'typeorm';
import { AnimeGenre } from './entities/anime-genre.entity';

export const genreProviders = [
  {
    provide: 'GENRE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AnimeGenre),
    inject: ['DATA_SOURCE'],
  },
];
