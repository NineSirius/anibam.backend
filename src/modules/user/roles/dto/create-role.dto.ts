import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Role name', required: true })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'base user role', required: true })
  @IsString()
  readonly description: string;

  @IsString()
  @ApiProperty({ example: 'USER', required: true })
  readonly slug: string;
}
