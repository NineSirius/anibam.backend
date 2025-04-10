import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import { UserRoles } from '../../roles/entities/user-roles.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Email пользователя',
  })
  @Column({ type: 'varchar', unique: true, nullable: false, length: 255 })
  email: string;

  @ApiProperty({
    example: 'ex4mple',
    description: 'Никнейм',
  })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  password: string;

  @ApiProperty({
    example: false,
    description: 'Забанен или нет',
    required: false,
  })
  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @ApiProperty({
    example: 'слишком много смотрел аниме',
    description: 'Причина бана',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  banReason: string;

  @ManyToMany(() => Role, () => UserRoles)
  @JoinTable()
  roles: Role[];
}
