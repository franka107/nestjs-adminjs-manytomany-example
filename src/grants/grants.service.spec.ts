import { Test, TestingModule } from '@nestjs/testing';
import { GrantsService } from './grants.service';

describe('GrantsService', () => {
  let service: GrantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrantsService],
    }).compile();

    service = module.get<GrantsService>(GrantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
