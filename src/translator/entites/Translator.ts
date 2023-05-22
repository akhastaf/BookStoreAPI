import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('translators')
export class Translator {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({
        type: 'text',
        nullable: true
    })
    description: string
    // image
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}