import { Controller } from '@nestjs/common';
import { AwardService } from './award.service';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}
}
