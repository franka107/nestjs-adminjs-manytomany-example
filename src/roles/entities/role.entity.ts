import { ObjectType, Field } from '@nestjs/graphql';
import { Grant } from 'src/grants/entities/grant.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Grant, (grant) => grant.role)
  public grants: Grant[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
