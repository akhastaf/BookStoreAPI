import { Book } from "src/book/entites/book.entity";
import { slugifyUtil } from "src/utils/slugify";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class Category {
    
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

    @ManyToOne(() => Category, (category) => category.sub_categories)
    parent_category: Category
    
    @OneToMany(() => Category, (category) => category.parent_category)
    sub_categories: Category[]

    @ManyToMany(() => Book, book => book.categories)
    books: Book[];
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @BeforeInsert()
    @BeforeUpdate()
    slugify(): void {
        this.slug = slugifyUtil(this.name)
    }
}