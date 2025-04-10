import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Администратор', description: 'Название роли' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({
    example: 'Главная роль, может всё.',
    description: 'Описание роли',
  })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ApiProperty({
    example: 'admin',
    description: 'Уникальная строка для индентификации роли в базе данных.',
  })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  slug: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
