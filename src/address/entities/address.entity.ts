import { User } from "src/user/entites/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('addresses')
export class Address {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string
    
    @Column()
    phone: string
    
    @Column()
    street: string
    
    @Column()
    city: string
    
    @Column()
    state: string
    
    @Column()
    postal_code: string
    
    @Column()
    country: string
    
    @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE'})
    user: User
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}