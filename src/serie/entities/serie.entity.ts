import { Book } from "src/book/entites/book.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, Index, DeleteDateColumn, BeforeUpdate } from "typeorm";
import { slugifyUtil } from "src/utils/slugify";

@Entity('series')
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description: string


  @Column()
  numberOfBooks: number;

  @Column({
    unique: true
  })
  @Index({
      unique: true
  })
  slug: string

  @OneToMany(() => Book, (book) => book.serie)
  books: Book[];

  @CreateDateColumn()
  created_at: Date
  
  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date

  @BeforeInsert()
  slugify(): void {
    this.slug = slugifyUtil(this.name)
  }
}
