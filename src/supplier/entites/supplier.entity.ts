import { Book } from "src/book/entites/book.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('suppliers')
export class Supplier {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string
    
    @Column()
    email: string
    
    @Column()
    phone: string
    
    @Column({
        type: 'text',
        nullable: true
    })
    address: string
    
    @OneToMany(() => Book, (book) => book.supplier, { onDelete: 'SET NULL' })
    books: Book[]
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}