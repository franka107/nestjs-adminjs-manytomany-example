import { Test, TestingModule } from '@nestjs/testing';
import { GrantsResolver } from './grants.resolver';
import { GrantsService } from './grants.service';

describe('GrantsResolver', () => {
  let resolver: GrantsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrantsResolver, GrantsService],
    }).compile();

    resolver = module.get<GrantsResolver>(GrantsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
