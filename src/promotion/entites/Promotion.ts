import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('promotions')
export class Promotion {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column({
        type: 'text',
        nullable: true
    })
    description: string
    @Column()
    start_date: Date
    @Column()
    end_date: Date
    @Column()
    active: boolean
    // images
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date

}