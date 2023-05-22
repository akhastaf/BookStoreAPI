import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum COVER_TYPE {
    HARD_COVER= 'HardCover',
    PAPERBACK= 'Paperback'
}

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column({
        type: 'text',
        nullable: true
    })
    description: string
    @Column({
        type: 'float'
    })
    price: number
    @Column()
    inventory_count: number
    @Column()
    code: string
    @Column()
    pages: number
    @Column()
    dimensions: string
    @Column({
        type: 'enum',
        enum: COVER_TYPE,
        default: COVER_TYPE.PAPERBACK
    })
    cover_type: string
    // publisher_id
    // translator_id
    // category_id
    // supplier_id
    // images
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}