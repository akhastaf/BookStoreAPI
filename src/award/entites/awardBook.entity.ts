import { Book } from "src/book/entites/book.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Award } from "./award.entity";

@Entity('awards_books')
export class AwardToBook {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    year: number

    @ManyToOne(() => Book, (book) => book.awardsToBook)
    book: Book
    
    @ManyToOne(() => Award, (award) => award.awardsToBook, { eager: true })
    award: Award
    
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}