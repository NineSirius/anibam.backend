import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  readonly password: string;
}
