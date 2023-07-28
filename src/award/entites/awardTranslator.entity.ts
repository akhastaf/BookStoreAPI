import { Translator } from "src/translator/entites/translator.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Award } from "./award.entity";

@Entity('awards_translators')
export class AwardToTranslator {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    year: number
    
    @ManyToOne(() => Translator, (translator) => translator.awardsToTranslator)
    translator: Translator
    
    @ManyToOne(() => Award, (award) => award.awardsToTranslator, { eager: true })
    award: Award
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}