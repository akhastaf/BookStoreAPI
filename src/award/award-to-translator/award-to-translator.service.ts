import { Injectable } from '@nestjs/common';
import { AwardToTranslator } from '../entites/awardTranslator.entity';
import { Translator } from 'src/translator/entites/translator.entity';
import { AwardService } from '../award.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwardToSubjectDtoClass } from '../dto/awardToSubjectDtoClass';

@Injectable()
export class AwardToTranslatorService {
    constructor(
        private readonly awardService: AwardService,
        @InjectRepository(AwardToTranslator) private readonly awardToTranslatorRepository: Repository<AwardToTranslator>,
        @InjectRepository(Translator) private readonly translatorRepository: Repository<Translator>,
    ) {}




    async create(awards: AwardToSubjectDtoClass[], translator_id: number): Promise<AwardToTranslator[]> {
        try {
            const translator = await this.translatorRepository.findOneOrFail({
                where: {
                    id: translator_id
                }
            })
            return await Promise.all(awards.map(async (award) => {
                const awardToTranslator: AwardToTranslator = this.awardToTranslatorRepository.create(award)
                awardToTranslator.translator = translator
                awardToTranslator.award = await this.awardService.findOneByIdWithType(award.award_id, 'translator')
                return await this.awardToTranslatorRepository.save(awardToTranslator)
            }))
        } catch (error) {
            throw error
        }
    }
    
    
    async update(awards: AwardToSubjectDtoClass[], translator_id: number): Promise<AwardToTranslator[]> {
        try {
            const translator = await this.translatorRepository.findOneOrFail({
                where: {
                    id: translator_id
                }
            })
            const awardsToTranslator : AwardToTranslator[] = await this.awardToTranslatorRepository.find({
                where: {
                    translator: {
                        id: translator.id
                    }
                },
                relations: {
                    translator: true
                }
            })
            awardsToTranslator.forEach(async (award) => {
                await this.awardToTranslatorRepository.softDelete(award.id)
            })
            return await Promise.all(awards.map(async (award) => {
                const awardToTranslator: AwardToTranslator = this.awardToTranslatorRepository.create(award)
                awardToTranslator.translator = translator
                awardToTranslator.award = await this.awardService.findOneByIdWithType(award.award_id, 'translator')
                return await this.awardToTranslatorRepository.save(awardToTranslator)
            }))
        } catch (error) {
            throw error
        }
    }
}
