import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>, // private readonly authService: AuthService,
  ) {}

  async create(createUserInput: CreateRoleInput): Promise<Role> {
    const newRole = this.rolesRepository.save({
      name: createUserInput.name,
    });
    return newRole;
  }

  // create(createRoleInput: CreateRoleInput) {
  //   return 'This action adds a new role';
  // }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
