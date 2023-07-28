import { AwardToTranslator } from "src/award/entites/awardTranslator.entity";
import { Book } from "src/book/entites/book.entity";
import { Image } from "src/image/entites/image.entity";
import { slugifyUtil } from "src/utils/slugify";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    biography: string

    @Column({
        unique: true
    })
    @Index({
        unique: true
    })
    slug: string

    @OneToOne(() => Image)
    @JoinColumn()
    image: Image

    @ManyToMany(() => Book, (book) => book.translators)
    books: Book[]

    @OneToMany(() => AwardToTranslator, (awardToTranslator) => awardToTranslator.translator, { cascade: true })
    awardsToTranslator: AwardToTranslator[]

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @BeforeInsert()
    // @BeforeUpdate()
    slugifyWarper(): void {
        this.slug = slugifyUtil(this.name)
    }
}