import { Module } from '@nestjs/common';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { GrantsModule } from 'src/grants/grants.module';
import { GrantsService } from 'src/grants/grants.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule,
    GraphqlModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
    // AccessControlModule.forRootAsync({ imports: [GrantsModule],
    //   useFactory: async (grantsService: GrantsService) => new RolesBuilder(),
    //   inject: [GrantsService],
    // }),
  ],
  exports: [
    ConfigModule,
    GraphqlModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
    // AccessControlModule.forRootAsync({
    //   imports: [GrantsModule],
    //   useFactory: async (grantsService: GrantsService) => new RolesBuilder(),
    //   inject: [GrantsService],
    // }),
  ],
})
export class CommonModule {}
