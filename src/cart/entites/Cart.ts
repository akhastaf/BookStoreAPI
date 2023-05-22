import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number
    // user_id
    // book_id
    @Column({
        type: 'integer',
        default: 1
    })
    quantity: number
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}