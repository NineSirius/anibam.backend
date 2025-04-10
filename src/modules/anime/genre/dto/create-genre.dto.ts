import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({ example: 'Этти', required: true })
  name: string;
  @ApiProperty({ example: 'etty', required: true })
  slug: string;
}
