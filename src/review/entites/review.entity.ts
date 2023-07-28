import { Book } from "src/book/entites/book.entity";
import { Image } from "src/image/entites/image.entity";
import { User } from "src/user/entites/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reviews')
export class Review {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        type: 'decimal',
        default: 5
    })
    rating: number
    
    @Column({
        type: 'text',
        nullable: true
    })
    comment: string
    
    @ManyToOne(() => User, {})
    user: User

    @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE'})
    book: Book

    @OneToMany(() => Image, () => {})
    @JoinColumn()
    images: Image[]
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}