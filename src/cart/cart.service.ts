import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entites/cart.entity';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { User } from 'src/user/entites/user.entity';
import { CreateItemInCartDto } from './dto/createItemInCart.dto';
import { BookService } from 'src/book/book.service';
import { UpdateItemCartDto } from './dto/updateItemInCart.dto';
import { DeleteItemsInCartDto } from './dto/deleteItemInCartt.dto';

@Injectable()
export class CartService {
    constructor(
        private readonly bookService: BookService,
        @InjectRepository(CartItem) private readonly cartRepository: Repository<CartItem>) {}

    async getAllItemsInCart(user: User): Promise<CartItem[]> {
        try {
            return await this.cartRepository.find({
                where: {
                    user: {
                        id: user.id
                    }
                },
                relations: ['book']
            })
            
        } catch (error) {
            throw error
        }
    }
    
    
    async createItemInCart(user: User, createItemDto: CreateItemInCartDto): Promise<CartItem> {
        try {

            const itemToFind : CartItem = await this.cartRepository.findOne({
                where: {
                    book: {
                        id: createItemDto.book_id
                    },
                    user: {
                        id: user.id
                    }
                },
                relations: ['book']
            })
            if (itemToFind != null) {
                itemToFind.quantity += createItemDto.quantity
                if (itemToFind.quantity > 10)
                    throw new BadRequestException('the quantity should not be greater than 10')
                return await this.cartRepository.save(itemToFind)
            }
            const item: CartItem = this.cartRepository.create(createItemDto)
            item.user = user
            item.book = await this.bookService.findOneById(createItemDto.book_id)
            return await this.cartRepository.save(item)
        } catch (error) {
            throw error
        }
    }

    async updateItemInCart(user: User, updateItemDto: UpdateItemCartDto): Promise<any> {
        try {
            const item : CartItem = await this.cartRepository.findOneOrFail({
                relations: ['book'],
                where: {
                    book: {
                        id: updateItemDto.book_id
                    },
                    user: {
                        id: user.id
                    }
                }
            })

            item.quantity += updateItemDto.quantity
            if (item.quantity > 10)
                throw new BadRequestException('the quantity should not be greater than 10')
            return await this.cartRepository.save(item)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`the book ${updateItemDto.book_id} not exist in the cart`)
            throw error
        }
    }

    async deleteItemsInCart(user: User, deleteItemsDto: DeleteItemsInCartDto): Promise<CartItem[]> {
        try {
            const item : CartItem[] = await this.cartRepository.find({
                relations: ['book'],
                where: {
                    book: {
                        id: In(deleteItemsDto.books_id)
                    },
                    user: {
                        id: user.id
                    }
                }
            })
            return await this.cartRepository.softRemove(item)
        } catch (error) {
            throw error
        }
    }

    async decreseQuantity(user: User, book_id: number) : Promise<CartItem> {
        try {
            const item : CartItem = await this.cartRepository.findOneOrFail({
                where: {
                    book: {
                        id: book_id
                    },
                    user: {
                        id: user.id
                    }
                }
            })
            if (item.quantity > 0)
                item.quantity--
            return await this.cartRepository.save(item)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`book : ${book_id} not found`)
            throw error
        }
    }


    async increseQuantity(user: User, book_id: number) : Promise<CartItem> {
        try {
            const item : CartItem = await this.cartRepository.findOneOrFail({
                where: {
                    book: {
                        id: book_id
                    },
                    user: {
                        id: user.id
                    }
                }
            })
            if (item.quantity < 10)
                item.quantity++
            return await this.cartRepository.save(item)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new NotFoundException(`book : ${book_id} not found`)
            throw error
        }
    }
}
