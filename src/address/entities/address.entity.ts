import { User } from "src/user/entites/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('addresses')
export class Address {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string
    
    @Column()
    phone: string
    
    @Column()
    address: string
    
    @Column()
    city: string
    
    @Column()
    state: string
    
    @Column()
    postal_code: string
    
    @Column()
    country: string

    @Column({
        default: false
    })
    is_default: boolean
    
    @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE'})
    user: User
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}