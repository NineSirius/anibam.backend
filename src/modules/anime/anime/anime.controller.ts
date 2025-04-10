import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-title.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { GetAnimeFiltersDto } from './dto/get-anime-filters.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  createAnime(@Body() titleDto: CreateAnimeDto): any {
    return this.animeService.createAnime(titleDto);
  }

  @Get()
  getTitles(@Query() params: GetAnimeFiltersDto) {
    return this.animeService.getAnime(params);
  }

  @Post('shikimori/:shikimori_id')
  createFromShikimori(@Param('shikimori_id') shikimori_id: string): any {
    return this.animeService.createFromShikimori(+shikimori_id);
  }
  @Get('shikimori/:shikimori_id')
  getTitleFromShikimori(@Param('shikimori_id') shikimori_id: number) {
    return this.animeService.getAnimeByShikimoriId(shikimori_id);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.animeService.getAnimeById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() titleDto: UpdateAnimeDto) {
    return this.animeService.updateAnime(+id, titleDto);
  }

  @Delete(':id')
  deleteTitle(@Param('id') id: string) {
    return this.animeService.deleteAnime(+id);
  }
}
