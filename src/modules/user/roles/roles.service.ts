import { Inject, Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLE_REPOSITORY') private roleRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.save(dto);
    return role;
  }

  async getRoleBySlug(slug: string) {
    const role = await this.roleRepository.findOne({ where: { slug } });
    return role;
  }

  async getRoles() {
    const [roles, count] = await this.roleRepository.findAndCount();
    return { items: roles, count };
  }
  async deleteRole(id: number) {
    await this.roleRepository.delete(id);
    return { status: 'success' };
  }
}
