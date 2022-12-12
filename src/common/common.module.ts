import { Module } from '@nestjs/common';
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
  ],
  exports: [
    ConfigModule,
    GraphqlModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
  ],
})
export class CommonModule {}
