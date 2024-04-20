import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entites/role.entity';
import { CreateRoleDto } from './dto/create.dto';
import { UpdateRoleDto } from './dto/update.dto';
import { checkAbilites } from 'src/authz/decorators/abilities.decorator';
import { AbilitiesGuard } from 'src/authz/guards/abilities.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('role')
@UseGuards(JwtGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @checkAbilites({
    subject: 'role',
    action: 'read' 
  })
  @UseGuards(AbilitiesGuard)
  @Get()
  async getAllRoles() : Promise<Role[]> {
    try {
      return await this.roleService.getAllRoles()
    } catch (error) {
      throw error
    }
  }

  @checkAbilites({
    subject: 'role',
    action: 'read',
  })
  @Get(':id')
  async getOneRole(@Param('id', ParseIntPipe) id: number) : Promise<Role> {
    try {
      return await this.roleService.getOneRole(id)
    } catch (error) {
      throw error
    }
  }

  @Post()
  async create(@Body() roleDto: CreateRoleDto) : Promise<Role> {
    try {
      return await this.roleService.create(roleDto)
    } catch (error) {
      throw error
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() roleDto: UpdateRoleDto) : Promise<any> {
    try {
      return await this.roleService.update(id, roleDto)
    } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) : Promise<Role> {
    try {
      return await this.roleService.delete(id)
    } catch (error) {
      throw error
    }
  }
}
