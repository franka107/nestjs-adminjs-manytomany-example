import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field({ description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  password: string;
}
