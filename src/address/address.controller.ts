import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { RequestWithAuth } from 'src/types';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { checkAbilites } from 'src/authz/decorators/abilities.decorator';
import { AbilitiesGuard } from 'src/authz/guards/abilities.guard';

@Controller('address')
@UseGuards(JwtGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('default')
  async getDefaultAddress(@Req() req: RequestWithAuth) : Promise<Address> {
    try {
      return await this.addressService.getDefaultAddress(req.user)
    } catch (error) {
      throw error
    }
  }
  
  @Put('default/:id')
  async setDefaultAddress(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithAuth) : Promise<Address> {
    try {
      return await this.addressService.setDefaultAddress(req.user, id)
    } catch (error) {
      throw error
    }
  }
  
  // @checkAbilites({
  //   action: 'read',
  //   subject: 'address'
  // })
  // @UseGuards(AbilitiesGuard)
  @Get()
  async getAllAddresses(@Req() req: RequestWithAuth) : Promise<Address[]> {
    try {
      return await this.addressService.getAllAddresses(req.user)
    } catch (error) {
      throw error
    }
  }
  
  @checkAbilites({
    action: 'read',
    subject: 'address',
    conditions: '	{ user: { id: $id } }	'
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getOneAddress(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithAuth) : Promise<Address> {
    try {
      return await this.addressService.getOneAddress(req.user, id)
    } catch (error) {
      throw error
    }
  }
  

  @Post()
  async create(@Req() req: RequestWithAuth, @Body() createAddressDto: CreateAddressDto) : Promise<Address> {
    try {
      return await this.addressService.create(req.user, createAddressDto)
    } catch (error) {
      throw error
    }
  }

  @Put(':id')
  async update(@Req() req: RequestWithAuth, @Param('id', ParseIntPipe) id: number, @Body() updateAddressDto: UpdateAddressDto) : Promise<any> {
    try {
      return await this.addressService.update(req.user, id, updateAddressDto)
    } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  async delete(@Req() req: RequestWithAuth, @Param('id', ParseIntPipe) id: number) : Promise<Address> {
    try {
      return await this.addressService.delete(req.user, id)
    } catch (error) {
      throw error
    }
  }
}
