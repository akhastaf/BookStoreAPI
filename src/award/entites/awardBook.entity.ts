import { Book } from "src/book/entites/book.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Award } from "./award.entity";

@Entity('awards_books')
export class AwardToBook {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    book_id: number
    
    @ManyToOne(() => Book, (book) => book.awardToBook)
    book: Book
    
    @Column()
    award_id: number
    
    @OneToOne(() => Award, (award) => award.awardToBook)
    award: Award
    
    @Column()
    year: string
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}