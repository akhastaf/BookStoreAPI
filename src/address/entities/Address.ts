import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
    // user_id
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
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}