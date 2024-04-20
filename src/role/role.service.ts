import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entites/role.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.dto';
import { UpdateRoleDto } from './dto/update.dto';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

    async getAllRoles(): Promise<Role[]> {
        try {
            return await this.roleRepository.find()
        } catch (error) {
            throw error
        }
    }

    async getOneRole(id: number): Promise<Role> {
        try {
            return await this.roleRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`role : ${id} not found`)
            throw error
        }
    }

    async create(roleDto: CreateRoleDto): Promise<Role> {
        try {
            const role: Role = this.roleRepository.create(roleDto)
            return await this.roleRepository.save(role)
        } catch (error) {
            if (error.code === '23505')
                throw new BadRequestException(`name : ${roleDto.name} alredy exist`)
            throw error
        }
    }

    async update(id: number, roleDto: UpdateRoleDto): Promise<any> {
        try {
            const role: Role = await this.roleRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
            return await this.roleRepository.update(role.id, roleDto)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`role : ${id} not found`)
            if (error.code === '23505')
                throw new BadRequestException(`name : ${roleDto.name} alredy exist`)
            throw error
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const role: Role = await this.roleRepository.findOneOrFail({
                where: {
                    id: id
                }
            })
            return await this.roleRepository.softRemove(role)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`role : ${id} not found`)
            throw error
        }
    }
}
