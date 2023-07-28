import { Test, TestingModule } from '@nestjs/testing';
import { AwardToAuthorService } from './award-to-author.service';

describe('AwardToAuthorService', () => {
  let service: AwardToAuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwardToAuthorService],
    }).compile();

    service = module.get<AwardToAuthorService>(AwardToAuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
