import { Test, TestingModule } from '@nestjs/testing';
import { AwardToTranslatorService } from './award-to-translator.service';

describe('AwardToTranslatorService', () => {
  let service: AwardToTranslatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwardToTranslatorService],
    }).compile();

    service = module.get<AwardToTranslatorService>(AwardToTranslatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
