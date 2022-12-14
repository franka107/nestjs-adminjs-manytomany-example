import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@ObjectType()
@Entity()
export class Grant extends BaseEntity {
  @Field({ description: 'Id field (placeholder)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.grants, { eager: true })
  @JoinColumn({
    name: 'roleId',
  })
  public role: Role;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  resource: string;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  action: string;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  attributes: string;
}
