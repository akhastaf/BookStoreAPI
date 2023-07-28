import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum DISCOUNT_TYPE {
    PERCENTAGE = 'percentage',
    FIXED_AMOUNT = 'fixed_amount'
}

@Entity('discounts')
export class Discount {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    code: string
    
    @Column({
        type: 'enum',
        enum: DISCOUNT_TYPE,
        default: DISCOUNT_TYPE.PERCENTAGE
    })
    type: string
    
    @Column({
        type: 'decimal',
        default: 0
    })
    value: number
    
    @Column({
        default: false
    })
    active: boolean
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}