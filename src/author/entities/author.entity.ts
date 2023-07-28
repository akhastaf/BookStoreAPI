import { AwardToAuthor } from "src/award/entites/awardAuthor.entity";
import { Book } from "src/book/entites/book.entity";
import { Image } from "src/image/entites/image.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { uuid as uuidv4 } from "uuidv4";
import { slugifyUtil } from "src/utils/slugify";


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
    biography: string

    @Column({
        unique: true
    })
    @Index({
        unique: true
    })
    slug: string

    @OneToOne(() => Image, () => {}, { cascade: ['soft-remove']})
    @JoinColumn()
    image: Image

    @ManyToMany(() => Book, (book) => book.authors)
    books: Book[]

    @OneToMany(() => AwardToAuthor, (awardToAuthor) => awardToAuthor.author, { cascade: true })
    awardsToAuthor: AwardToAuthor[]

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