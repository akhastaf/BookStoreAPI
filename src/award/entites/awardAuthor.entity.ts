import { Author } from "src/author/entities/author.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Award } from "./award.entity";

@Entity('awards_authors')
export class AwardToAuthor {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    author_id: number
    
    @ManyToOne(() => Author, (author) => author.awardToAuthor)
    author: Author
    
    @Column()
    award_id: number
    
    @OneToOne(() => Award, (award) => award.awardToAuthor)
    award: Award
    
    @Column()
    year: string
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}