import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
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
    @Column({ nullable: true })
    password_reset_expires: Date;
    // avatar_id
    // role_id
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}