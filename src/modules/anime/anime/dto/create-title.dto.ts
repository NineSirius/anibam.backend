import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { AnimeType } from '../enums/anime-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimeDto {
  @ApiProperty({ example: 'Tokyou ghoul', description: 'Название аниме' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Токийский гуль',
    description: 'Название аниме на русском',
  })
  @IsString()
  russian: string;

  @ApiProperty({
    example: '/media/dsdsds.png',
    description: 'постер',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  poster?: string;

  @ApiProperty({
    example: 'tv',
    description: 'Тип',
  })
  @IsEnum(AnimeType)
  type: AnimeType;

  @ApiProperty({
    example: '8.83',
    description: 'Оценка',
  })
  @IsInt()
  @Min(0)
  score: number;

  @ApiProperty({
    example: 'ongoing',
    description: 'Статус',
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: '12',
    description: 'Кол-во эпизодов',
  })
  @IsInt()
  @Min(0)
  episodes: number;

  @ApiProperty({
    example: '1',
    description: 'Кол-во вышедших эпизодов',
  })
  @IsInt()
  @Min(0)
  episodes_aired: number;
}
