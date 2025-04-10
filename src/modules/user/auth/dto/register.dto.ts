import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user', required: true })
  readonly username: string;

  @ApiProperty({ example: 'admin', required: true })
  readonly email: string;

  @ApiProperty({ example: 'admin', required: true })
  readonly password: string;
}
