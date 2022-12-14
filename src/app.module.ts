import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { roles } from './app.roles';
import { RolesService } from './roles/roles.service';
import { GrantsModule } from './grants/grants.module';
import { GrantsService } from './grants/grants.service';

@Module({
  imports: [
    AccessControlModule.forRootAsync({
      imports: [GrantsModule],
      useFactory: async (grantsService: GrantsService) =>
        new RolesBuilder(await grantsService.findAllForAc()),
      inject: [GrantsService],
    }),
    CommonModule,
    AnimalsModule,
    UsersModule,
    RolesModule,
    GrantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
