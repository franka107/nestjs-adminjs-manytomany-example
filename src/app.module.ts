import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RBAcModule } from './rbac';
import { RBAC } from './common/auth/rbac';

@Module({
  imports: [CommonModule, AnimalsModule, UsersModule, RBAcModule.forRoot(RBAC)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
