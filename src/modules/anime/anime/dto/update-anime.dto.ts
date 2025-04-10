import { PartialType } from '@nestjs/swagger';
import { CreateAnimeDto } from './create-title.dto';

export class UpdateAnimeDto extends PartialType(CreateAnimeDto) {}
