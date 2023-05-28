import { Book } from "src/book/entites/book.entity";
import { slugify } from "src/utils/slugify";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, Index } from "typeorm";

@Entity('series')
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @BeforeInsert()
  slugify(): void {
    this.slug = slugify(this.name, this.id)
  }
}
