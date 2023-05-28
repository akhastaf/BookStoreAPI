import { Controller } from '@nestjs/common';
import { SerieService } from './serie.service';

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}
}
