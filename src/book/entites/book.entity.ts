import { Author } from "src/author/entities/author.entity";
import { AwardToBook } from "src/award/entites/awardBook.entity";
import { Category } from "src/category/entites/category.entity";
import { Image } from "src/image/entites/image.entity";
import { Publisher } from "src/publisher/entites/publisher.entity";
import { Review } from "src/review/entites/review.entity";
import { Serie } from "src/serie/entities/serie.entity";
import { Supplier } from "src/supplier/entites/supplier.entity";
import { Translator } from "src/translator/entites/translator.entity";
import { slugify } from "src/utils/slugify";
import { BeforeInsert, Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number
    
    @Column()
    inventory_count: number
    
    @Column()
    isbn: string
    
    @Column()
    pages: number
    
    @Column({
        default: false
    })
    is_in_series: boolean
    
    @Column({
        nullable: true
    })
    series_order: number

    @Column({ nullable: true })
    orderInSerie: number;
    
    @Column()
    dimensions: string
    
    @Column({
        type: 'enum',
        enum: COVER_TYPE,
        default: COVER_TYPE.PAPERBACK
    })
    cover_type: string
    
    @Column({
        type: 'date'
    })
    date_of_publition: Date
    
    @Column()
    weight: string

    @Column({
        unique: true
    })
    @Index({
        unique: true
    })
    slug: string;

    @ManyToOne(() => Serie, (serie) => serie.books)
    @JoinColumn()
    serie: Serie;
    
    @ManyToMany(() => Author, (author) => author.books, { onDelete: 'SET NULL' })
    @JoinTable()
    authors: Author[]
    
    @ManyToMany(() => Publisher, (publisher) => publisher.books, { onDelete: 'SET NULL' })
    @JoinTable()
    publishers: Publisher[]
    
    @ManyToMany(() => Translator, (translator) => translator.books, { onDelete: 'SET NULL' })
    @JoinTable()
    translators: Translator[]
    
    @ManyToOne(() => Supplier, (supplier) => supplier.books, { onDelete: 'SET NULL' })
    @JoinColumn()
    supplier: Supplier
    
    @ManyToMany(() => Category, category => category.books)
    @JoinTable()
    categories: Category[];
    
    @OneToMany(() => Image, () => {})
    @JoinColumn()
    images: Image[];
    

    @OneToMany(() => AwardToBook, (awardToBook) => awardToBook.book)
    awardToBook: AwardToBook[]

    @OneToMany(() => Review, (review) => review.book, { onDelete: 'SET NULL'})
    reviews: Review[]
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @BeforeInsert()
    slugify(): void {
        this.slug = slugify(this.title, this.id);
    }
}