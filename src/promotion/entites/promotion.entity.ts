import { Image } from "src/image/entites/image.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('promotions')
export class Promotion {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    title: string
    
    @Column({
        type: 'text',
        nullable: true
    })
    description: string
    
    @Column()
    start_date: Date
    
    @Column()
    end_date: Date
    
    @Column()
    active: boolean
    
    @OneToOne(() => Image)
    @JoinColumn()
    image: Image;
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}