import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field({ description: 'Id field (placeholder)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  name: string;
}
