import { Author } from "src/author/entities/author.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Award } from "./award.entity";

@Entity('awards_authors')
export class AwardToAuthor {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    year: number
    
    @ManyToOne(() => Author, (author) => author.awardsToAuthor)
    author: Author
    
    @ManyToOne(() => Award, (award) => award.awardsToAuthor, { eager: true })
    award: Award
    
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}