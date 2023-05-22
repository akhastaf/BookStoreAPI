import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    action: string
    @Column()
    subject?: string
    @Column()
    fields?: string
    @Column()
    conditions?: string
    @Column()
    inverted?: boolean
    @Column()
    reason?: string
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}