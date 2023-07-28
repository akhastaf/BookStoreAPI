import { Test, TestingModule } from '@nestjs/testing';
import { AwardToBookService } from './award-to-book.service';

describe('AwardToBookService', () => {
  let service: AwardToBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwardToBookService],
    }).compile();

    service = module.get<AwardToBookService>(AwardToBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
