import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AnimeType } from '../enums/anime-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('anime')
export class Anime {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({})
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  russian: string;

  @Column({ type: 'varchar', length: 255 })
  poster?: string;

  @Column({
    type: 'enum',
    enum: AnimeType,
  })
  type: AnimeType;

  @Column('float')
  score: number;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @Column({ type: 'numeric' })
  episodes: number;

  @Column({ type: 'numeric' })
  episodes_aired: number;

  @Column({ type: 'date', default: () => 'now()' })
  aired_on: string;

  @Column({ type: 'date', default: () => 'now()' })
  released_on: string;
}
