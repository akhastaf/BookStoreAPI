import { Address } from "src/address/entities/address.entity";
import { CartItem } from "src/cart/entites/cart.entity";
import { Image } from "src/image/entites/image.entity";
import { Order } from "src/order/entites/order.entity";
import { Role } from "src/role/entites/role.entity";
import { Wishlist } from "src/wishlist/entites/wishlist.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs"
import { Exclude } from "class-transformer";

export enum PROVIDER {
    GOOGLE='google',
    FACEBOOK='facebook'
}

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

    @Exclude()
    @Column({
        nullable: true
    })
    password: string

    @Column({
        nullable:true
    })
    phone: string

    @Column({
        nullable: true
    })
    address: string

    @Column({ default: false })
    two_factor_enabled: boolean;

    @Exclude()
    @Column({ nullable: true })
    two_factor_secret: string;

    @Exclude()
    @Column({ nullable: true })
    two_factor_recovery_code: string;

    @Exclude()
    @Column({ nullable: true })
    password_reset_token: string;

    @Exclude()
    @Column({
        nullable: true
    })
    verification_token: string

    @Column({
        default: false
    })
    is_verified: boolean

    @Column({
        nullable: true,
        type: 'enum',
        enum: PROVIDER,
        default: PROVIDER.GOOGLE
    })
    provider: PROVIDER

    @OneToMany(() => CartItem, (cartitem) => cartitem.user, {onDelete: 'CASCADE'})
    @JoinColumn()
    carts: CartItem[]

    @OneToOne(() => Image)
    @JoinColumn()
    avatar: Image

    @ManyToOne(() => Role, {onDelete: 'SET NULL' })
    @JoinColumn()
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

    @DeleteDateColumn()
    deleted_at: Date

    @BeforeInsert()
    async hashPassword() : Promise<void> {
        if (this.password != undefined) 
            this.password = await bcrypt.hash(this.password, 10)
        console.log(this.password)
    }

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
}