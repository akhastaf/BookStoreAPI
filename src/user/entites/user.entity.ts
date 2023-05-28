import { Address } from "src/address/entities/address.entity";
import { Cart } from "src/cart/entites/cart.entity";
import { Image } from "src/image/entites/image.entity";
import { Order } from "src/order/entites/order.entity";
import { Role } from "src/role/entites/role.entity";
import { Wishlist } from "src/wishlist/entites/wishlist.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs"

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column({ default: false })
    two_factor_enabled: boolean;

    @Column({ nullable: true })
    two_factor_secret: string;

    @Column({ nullable: true })
    two_factor_recovery_code: string;

    @Column({ nullable: true })
    password_reset_token: string;

    @Column({
        nullable: true
    })
    verification_token: string

    @Column({
        default: false
    })
    is_verified: boolean

    @OneToMany(() => Cart, (cart) => cart.user, {onDelete: 'CASCADE'})
    carts: Cart[]

    @OneToOne(() => Image)
    avatar: Image

    @ManyToOne(() => Role, {onDelete: 'SET NULL' })
    role: Role

    @OneToMany(() => Address, (address) => address.user)
    addresses: Address[]

    @OneToMany(() => Wishlist, () => {})
    @JoinColumn()
    wishlist: Wishlist[]

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]


    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @BeforeInsert()
    async hashPassword() : Promise<void> {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}