import { Module } from '@nestjs/common';
import { GrantsService } from './grants.service';
import { GrantsResolver } from './grants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Grant } from './entities/grant.entity';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Grant])],
  providers: [GrantsResolver, GrantsService],
  exports: [GrantsService],
})
export class GrantsModule {}
