import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { AnimeType } from '../enums/anime-type.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AnimeNamesDto } from './anime-names.dto';

export class CreateAnimeDto {
  @ApiProperty({
    example: {
      ru: 'Наруто',
      en: 'Naruto',
      alternatives: ['ナルト', 'Naruto Uzumaki'],
    },
    description: 'Названия',
  })
  @ValidateNested()
  @Type(() => AnimeNamesDto)
  names: AnimeNamesDto;

  @ApiProperty({
    example: '/media/dsdsds.png',
    description: 'Постер',
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
