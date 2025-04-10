import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnimeNamesDto {
  @ApiProperty({ example: 'Наруто', description: 'Название на русском' })
  @IsString()
  ru: string;

  @ApiProperty({ example: 'Naruto', description: 'Название на английском' })
  @IsString()
  en: string;

  @ApiProperty({
    example: ['ナルト', 'Naruto Uzumaki'],
    description: 'Альтернативные названия',
  })
  @IsArray()
  @IsString({ each: true })
  alternatives: string[];
}
