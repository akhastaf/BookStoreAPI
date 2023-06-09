import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('images')
export class Image {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        transformer: {
            from: img => `${process.env.HOST}/${img}`,
            to: img => img
        }
    })
    file_path: string
    
    @Column({
        type: 'integer'
    })
    width: number
    
    @Column({
        type: 'integer'
    })
    height: number
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}