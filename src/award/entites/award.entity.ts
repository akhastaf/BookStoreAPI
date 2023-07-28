import { Image } from "src/image/entites/image.entity"
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { AwardToTranslator } from "./awardTranslator.entity"
import { AwardToAuthor } from "./awardAuthor.entity"
import { AwardToBook } from "./awardBook.entity"
import { slugifyUtil } from "src/utils/slugify"

export enum AWARD_TYPE {
    TRANSLATOR= 'translator',
    AUTHOR= 'author',
    BOOK= 'book'
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
        enum: AWARD_TYPE,
        default: AWARD_TYPE.BOOK
    })
    award_type: string

    @Column({
        unique: true
    })
    @Index({
        unique: true
    })
    slug: string


    @OneToOne(() => Image, () => {}, { cascade: ['soft-remove']})
    @JoinColumn()
    badge: Image
    
    @OneToMany(() => AwardToTranslator, (awardToTranslator) => awardToTranslator.award, { cascade: true })
    awardsToTranslator?: AwardToTranslator[]
    
    @OneToMany(() => AwardToBook, (awardToBook) => awardToBook.award, { cascade: true })
    awardsToAuthor?: AwardToAuthor[]

    @OneToMany(() => AwardToAuthor, (awardToAuthor) => awardToAuthor.award, { cascade: true })
    awardsToBook?: AwardToBook[]

    books: string
    
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