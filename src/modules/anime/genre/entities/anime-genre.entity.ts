import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genre')
export class AnimeGenre {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Этти', description: 'Название роли' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'etty', description: 'Уникальная строка ключ' })
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;
}
