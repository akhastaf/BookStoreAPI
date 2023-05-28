import { User } from "src/user/entites/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderBook } from "./orderBook.entity";
import { Discount } from "src/discount/entites/discount.entity";

export enum OrderStatus {
    PENDING = "Pending",
    PROCESSING = "Processing",
    SHIPPED = "Shipped",
    DELIVRED = "Delivered",
    CANCELLED = "Cancelled",
    RETURNED = "Returned",
    REFUNDED = "Refunded",
    ON_HOLD = "On Hold"
}


@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price_before_discount: number

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    total_price: number

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    shipping_cost: number

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus

    @Column()
    tracking_number: string
    
    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE'})
    @JoinColumn()
    user: User

    @OneToMany(() => OrderBook, orderItem => orderItem.order)
    orderItems: OrderBook[];

    @ManyToOne(() => Discount)
    discount: Discount

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}