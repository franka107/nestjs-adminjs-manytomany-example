import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GrantsService } from './grants.service';
import { Grant } from './entities/grant.entity';
import { CreateGrantInput } from './dto/create-grant.input';
import { UpdateGrantInput } from './dto/update-grant.input';

@Resolver(() => Grant)
export class GrantsResolver {
  constructor(private readonly grantsService: GrantsService) {}

  @Mutation(() => Grant)
  createGrant(@Args('createGrantInput') createGrantInput: CreateGrantInput) {
    return this.grantsService.create(createGrantInput);
  }

  @Query(() => [Grant], { name: 'grants' })
  findAll() {
    return this.grantsService.findAll();
  }

  @Query(() => Grant, { name: 'grant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.grantsService.findOne(id);
  }

  @Mutation(() => Grant)
  updateGrant(@Args('updateGrantInput') updateGrantInput: UpdateGrantInput) {
    return this.grantsService.update(updateGrantInput.id, updateGrantInput);
  }

  @Mutation(() => Grant)
  removeGrant(@Args('id', { type: () => Int }) id: number) {
    return this.grantsService.remove(id);
  }
}
