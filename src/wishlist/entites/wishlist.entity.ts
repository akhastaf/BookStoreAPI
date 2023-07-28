import { Book } from "src/book/entites/book.entity";
import { User } from "src/user/entites/user.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('wishlists')
export class Wishlist {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => User, (user) => user.wishlist)
    user: User
    
    @ManyToOne(() => Book, () => {})
    @JoinColumn()
    book: Book
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}