import { AwardToTranslator } from "src/award/entites/awardTranslator.entity";
import { Book } from "src/book/entites/book.entity";
import { Image } from "src/image/entites/image.entity";
import { slugify } from "src/utils/slugify";
import { BeforeInsert, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToMany(() => Book, (book) => book.translators, { onDelete: 'SET NULL' })
    books: Book[]

    @OneToMany(() => AwardToTranslator, (awardToTranslator) => awardToTranslator.translator)
    awardToTranslator: AwardToTranslator[]

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @BeforeInsert()
    slugify(): void {
        this.slug = slugify(this.name, this.id);
    }
}