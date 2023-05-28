import { Image } from "src/image/entites/image.entity"
import { BeforeInsert, Column, CreateDateColumn, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { AwardToTranslator } from "./awardTranslator.entity"
import { AwardToAuthor } from "./awardAuthor.entity"
import { AwardToBook } from "./awardBook.entity"
import { slugify } from "src/utils/slugify"

export enum BADGE_TYPE {
    TRANSLATOR_BADGE= 'translator',
    AUTHOR_BADGE= 'author',
    BOOK_BADGE= 'book'
}

@Entity('awards')
export class Award {
    
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
        type: 'enum',
        enum: BADGE_TYPE,
        default: BADGE_TYPE.BOOK_BADGE
    })
    badge_type: number

    @Column({
        unique: true
    })
    @Index({
        unique: true
    })
    slug: string
    
    @OneToOne(() => Image)
    badge: Image
    
    @OneToMany(() => AwardToTranslator, (awardToTranslator) => awardToTranslator.award)
    awardToTranslator?: AwardToTranslator
    
    @OneToMany(() => AwardToBook, (awardToBook) => awardToBook.award)
    awardToAuthor?: AwardToTranslator
    
    @OneToMany(() => AwardToAuthor, (awardToAuthor) => awardToAuthor.award)
    awardToBook?: AwardToAuthor
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @BeforeInsert()
    slugify(): void {
        this.slug = slugify(this.name, this.id);
    }
}