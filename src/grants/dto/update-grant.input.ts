import { CreateGrantInput } from './create-grant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGrantInput extends PartialType(CreateGrantInput) {
  @Field(() => Int)
  id: number;
}
