import { Book } from "src/book/entites/book.entity";
import { User } from "src/user/entites/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('carts')
export class CartItem {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        type: 'integer',
        default: 1
    })
    quantity: number
    
    @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
    user: User
    
    @ManyToOne(() => Book)
    @JoinColumn()
    book: Book
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}