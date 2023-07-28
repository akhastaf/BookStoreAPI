import { Book } from "src/book/entites/book.entity";
import { Image } from "src/image/entites/image.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { slugifyUtil } from "src/utils/slugify";

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
    
    @OneToOne(() => Image, () => {}, { cascade: true})
    @JoinColumn()
    image: Image
    
    @ManyToMany(() => Book, (book) => book.publishers, { onDelete: 'SET NULL' })
    books: Book[]
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @BeforeInsert()
    // @BeforeUpdate()
    slugify(): void {
        this.slug = slugifyUtil(this.name)
    }
}
