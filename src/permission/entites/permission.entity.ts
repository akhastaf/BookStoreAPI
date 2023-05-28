import { Role } from "src/role/entites/role.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('permissions')
export class Permission {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    action: string
    
    @Column()
    subject?: string
    
    @Column()
    fields?: string
    
    @Column()
    conditions?: string
    
    @Column()
    inverted?: boolean
    
    @Column()
    reason?: string
    
    @ManyToOne(() => Role, (role) => role.permission)
    role: Role
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}