import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-title.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  createAnime(@Body() titleDto: CreateAnimeDto): any {
    return this.animeService.createAnime(titleDto);
  }

  @Get()
  getTitles() {
    return this.animeService.getAnime();
  }

  @Get(':shikimori_id')
  getTitleFromShikimori(@Param('shikimori_id') id: number) {
    return this.animeService.getAnimeByShikimoriId(id);
  }

  @Delete(':id')
  deleteTitle(@Param('id') id: string) {
    return this.animeService.deleteAnime(+id);
  }
}
