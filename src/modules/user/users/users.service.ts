import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { ILike, Repository } from 'typeorm';
import { GetUserFiltersDto } from './dto/get-user-filters.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    const role = await this.roleService.getRoleBySlug('USER');

    if (role) {
      user.roles = [role];
      await this.userRepository.save(user);
    } else {
      throw new Error("Couldn't find the role");
    }
    return user;
  }

  async getAllUsers(filters: GetUserFiltersDto) {
    const [users, count] = await this.userRepository.findAndCount({
      relations: ['roles'],
      where: {
        username: filters.search ? ILike(`%${filters.search}%`) : undefined,
      },
      take: filters.limit,
      skip: +filters.page * +filters.limit,
    });
    return { items: users, count };
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUserByUsername(username: string) {
    console.log('Looking for username:', username);
    const user = await this.userRepository.findOne({
      where: { username },
    });
    console.log('Found user:', user);
    return user;
  }

  async deleteByid(id: number) {
    await this.userRepository.delete(id);
    return { status: 'success' };
  }
}
