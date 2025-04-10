import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class DefaultFiltersList {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false, default: 10 })
  limit?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false, default: 1 })
  page?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
