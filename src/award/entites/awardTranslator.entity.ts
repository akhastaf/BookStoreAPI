import { Translator } from "src/translator/entites/translator.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Award } from "./award.entity";

@Entity('awards_translators')
export class AwardToTranslator {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    translator_id: number
    
    @ManyToOne(() => Translator, (translator) => translator.awardToTranslator)
    translator: Translator
    
    @Column()
    award_id: number
    
    @OneToOne(() => Award, (award) => award.awardToTranslator)
    award: Award
    
    @Column()
    year: string
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}