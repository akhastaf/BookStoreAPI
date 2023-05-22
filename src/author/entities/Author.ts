import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string
    @Column({
        type: 'text',
        nullable: true
    })
    description
    // image_id
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}