import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AnimeType } from '../enums/anime-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('anime')
export class Anime {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: {
      ru: 'Наруто',
      en: 'Naruto',
      alternatives: ['ナルト', 'Naruto Uzumaki'],
    },
  })
  @Column({
    type: 'jsonb',
    default: () => `'{"ru": "", "en": "", "alternatives": []}'`,
  })
  names: {
    ru: string;
    en: string;
    alternatives: string[];
  };

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  poster?: string;

  @Column({
    type: 'enum',
    enum: AnimeType,
    nullable: true,
  })
  type: AnimeType;

  @Column('float')
  score: number;

  @Column({ type: 'numeric', nullable: true })
  shikimori_id: number;

  @Column({ type: 'numeric', nullable: true })
  kinopoisk_id: number;

  @Column({ type: 'numeric', nullable: true })
  imdb_id: number;

  @Column({ type: 'varchar', length: 255, default: 'anons' })
  status: string;

  @Column({ type: 'numeric', default: 0 })
  episodes: number;

  @Column({ type: 'numeric', default: 0 })
  episodes_aired: number;

  @Column({ type: 'date', default: () => 'now()', nullable: true })
  aired_on: string;

  @Column({ type: 'date', default: () => 'now()', nullable: true })
  released_on: string;
}
