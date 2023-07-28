import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from 'src/user/entites/user.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AddressService {
    constructor(@InjectRepository(Address) private readonly addressRepository: Repository<Address>) {}

    async getAllAddresses(user: User): Promise<Address[]> {
        try {
            return await this.addressRepository.find({
                relations: {
                    user: true
                },
            })
        } catch (error) {
            throw error
        }
    }


    async getOneAddress(user: User, id: number): Promise<Address> {
        try {
            return await this.addressRepository.findOneOrFail({
                relations: {
                    user: true
                },
                where: {
                    id: id,
                    user: {
                        id: user.id
                    }
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`the address ${id} is not found`)
            throw error
        }
    }

    async setDefaultAddress(user: User, id: number): Promise<Address> {
        try {
           const addressToSetDefault : Address = await this.addressRepository.findOneOrFail({
                where: {
                    id: id,
                    user: {
                        id: user.id
                    }
                }
            })
            const defaultAddrres: Address = await this.addressRepository.findOne({
                relations: {
                    user: true
                },
                where: {
                    user: {
                        id: user.id
                    },
                    is_default: true
                }
            })

            if (defaultAddrres != null) {
                defaultAddrres.is_default = false
                await this.addressRepository.save(defaultAddrres)
            }
            addressToSetDefault.is_default = true
            return  await this.addressRepository.save(addressToSetDefault)
                
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`the address ${id} is not found`)
            throw error
        }
    }

    async getDefaultAddress(user: User): Promise<Address> {
        try {
           return await this.addressRepository.findOneOrFail({
                where: {
                    user: {
                        id: user.id
                    },
                    is_default: true
                }
            })

        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`no default address was set`)
            throw error
        }
    }


    async create(user: User, createAddressDto: CreateAddressDto): Promise<Address> {
        try {
            const address : Address = this.addressRepository.create(createAddressDto)
            address.user = user
            return await this.addressRepository.save(address)
        } catch (error) {
            throw error
        }
    }


    async update(user: User, id: number, updateAddressDto: UpdateAddressDto): Promise<any> {
        try {
            const address : Address = await this.addressRepository.findOneOrFail({
                where: {
                    id: id,
                    user: {
                        id: user.id
                    }

                }
            })
            return await this.addressRepository.update(address.id, updateAddressDto)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`the address ${id} is not found`)
            throw error
        }
    }


    async delete(user: User, id: number): Promise<Address> {
        try {
            const address : Address = await this.addressRepository.findOneOrFail({
                where: {
                    id: id,
                    user: {
                        id: user.id
                    }

                }
            })
            if (address.is_default === true)
                throw new ForbiddenException(`you cant delete the default address`)
            return await this.addressRepository.softRemove(address)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`the address ${id} is not found`)
            throw error
        }
    }

    
}
