import { Book } from "src/book/entites/book.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Review } from "src/review/entites/review.entity";

@Entity('orders_books')
export class OrderBook {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    quantity: number
    
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number
    
    @Column()
    order_id: number;
    
    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;
    
    @Column()
    book_id: number;
    
    @ManyToOne(() => Book)
    book: Book;
    
    @OneToOne(() => Review)
    @JoinColumn()
    review: Review;

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}