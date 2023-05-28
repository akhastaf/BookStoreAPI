import { Permission } from "src/permission/entites/permission.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @OneToMany(() => Permission, (permission) => permission.role)
    permission: Permission[]
    
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}