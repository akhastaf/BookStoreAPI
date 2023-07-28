import { Book } from "src/book/entites/book.entity";
import { Promotion } from "src/promotion/entites/promotion.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('images')
export class Image {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        transformer: {
            from: img => `${process.env.HOST}${img}`,
            to: img => img
        }
    })
    file_path: string
    
    @Column({
        type: 'integer'
    })
    width: number
    
    @Column({
        type: 'integer'
    })
    height: number

    @ManyToOne(() => Book, (book: Book) => book.images)
    book?: Book

    @ManyToOne(() => Promotion, (promotion: Promotion) => promotion.images)
    promotion?: Promotion
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}