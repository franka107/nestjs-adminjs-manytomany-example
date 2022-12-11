import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersService, UsersResolver],
  controllers: [UsersController],
})
export class UsersModule {}
