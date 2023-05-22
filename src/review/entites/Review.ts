import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number
    // user_id
    // book_id
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
    // images
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}