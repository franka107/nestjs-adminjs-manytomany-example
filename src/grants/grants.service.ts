import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGrantInput } from './dto/create-grant.input';
import { UpdateGrantInput } from './dto/update-grant.input';
import { Grant } from './entities/grant.entity';

@Injectable()
export class GrantsService {
  constructor(
    @InjectRepository(Grant) private grantsRepository: Repository<Grant>,
  ) {}
  create(createGrantInput: CreateGrantInput) {
    return 'This action adds a new grant';
  }

  async findAll() {
    const grants = await this.grantsRepository.find();

    return grants;
  }

  async findAllForAc() {
    const grants = await this.findAll();
    const modifiedGrants = grants.map((grant) => ({
      ...grant,
      role: grant.role.id,
    }));
    console.log(modifiedGrants);
    return modifiedGrants;
  }

  findOne(id: number) {
    return `This action returns a #${id} grant`;
  }

  update(id: number, updateGrantInput: UpdateGrantInput) {
    return `This action updates a #${id} grant`;
  }

  remove(id: number) {
    return `This action removes a #${id} grant`;
  }
}
