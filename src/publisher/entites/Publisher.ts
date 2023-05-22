import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('publishers')
export class Publisher {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({
        type: 'text',
        nullable: true
    })
    description: string
    // image_id
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}