import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimeGenre } from './entities/anime-genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Controller('genre')
@ApiTags('Anime Genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({ summary: 'Создание аниме жанра' })
  @ApiResponse({ status: 201, type: AnimeGenre })
  @Get()
  getGenres() {
    return this.genreService.getGenres();
  }

  @Post()
  create(@Body() genreDto: CreateGenreDto) {
    return this.genreService.createGenre(genreDto);
  }

  @Post('load-from-shikimori')
  createFromShikmori() {
    return this.genreService.createFromShikimori();
  }
}
