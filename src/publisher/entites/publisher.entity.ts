import { Book } from "src/book/entites/book.entity";
import { Image } from "src/image/entites/image.entity";
import { slugify } from "src/utils/slugify";
import { BeforeInsert, Column, CreateDateColumn, Entity, Index, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({
        unique: true
    })
    @Index({
        unique: true
    })
    slug: string
    
    @OneToOne(() => Image)
    image: Image
    
    @ManyToMany(() => Book, (book) => book.publishers, { onDelete: 'SET NULL' })
    books: Book[]
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @BeforeInsert()
    slugify(): void {
        this.slug = slugify(this.name, this.id)
    }
}