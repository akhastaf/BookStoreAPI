import { Role } from "src/role/entites/role.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Action {
    MANAGE='manage',
    READ='read',
    UPDATE='update',
    CREATE='create',
    DELETE='delete',
}

export enum Subject {
    AUTHOR='author',
    ADDRESS='address',
    AWARD='award',
    BOOK='book',
    CART='cart',
    CATEGORY='category',
    DISCOUNT='discount',
    ORDER='order',
    PERMISSION='permission',
    PROMOTION='promotion',
    PUBLISHER='publisher',
    REVIEW='review',
    ROLE='role',
    SERIE='serie',
    SUPPLIER='supplier',
    TRANSLATOR='translator',
    USER='user',
    WISHLIST='wishlist'
}

@Entity('permissions')
export class Permission {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        type: 'enum',
        enum: Action
    })
    action: string
    
    @Column({
        type: 'enum',
        enum: Subject
    })
    subject?: string
    
    @Column()
    fields?: string
    
    @Column()
    conditions?: string
    
    @Column()
    inverted?: boolean
    
    @Column()
    reason?: string
    
    @ManyToOne(() => Role, (role) => role.permissions)
    role: Role
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}