import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('wishlists')
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number
    // user_id
    // book_id
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}