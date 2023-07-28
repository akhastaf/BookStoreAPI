import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { RequestWithAuth } from 'src/types';
import { CartItem } from './entites/cart.entity';
import { CreateItemInCartDto } from './dto/createItemInCart.dto';
import { DeleteItemsInCartDto } from './dto/deleteItemInCartt.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getAllItemsInCart(@Req() req: RequestWithAuth): Promise<CartItem[]> {
    try {
      return await this.cartService.getAllItemsInCart(req.user)
    } catch (error) {
      throw error
    }
  }
  
  
  @Post()
  async createItemInCart(@Req() req: RequestWithAuth, @Body() createItemDto: CreateItemInCartDto): Promise<CartItem> {
    try {
      return await this.cartService.createItemInCart(req.user, createItemDto)
    } catch (error) {
      throw error
    }
  }
  
  @Put()
  async updateItemInCart(@Req() req: RequestWithAuth, @Body() updateItemDto: CreateItemInCartDto): Promise<CartItem> {
    try {
      return await this.cartService.updateItemInCart(req.user, updateItemDto)
    } catch (error) {
      throw error
    }
  }

  @Delete()
  async deleteItemsInCart(@Req() req: RequestWithAuth, @Body() deleteItemsDto: DeleteItemsInCartDto): Promise<CartItem[]> {
    try {
      return await this.cartService.deleteItemsInCart(req.user, deleteItemsDto)
    } catch (error) {
      throw error
    }
  }

  @Get('decrese/:book_id')
  async decreseQuantity(@Req() req: RequestWithAuth, @Param('book_id', ParseIntPipe) book_id: number) {
    try {
      return await this.cartService.decreseQuantity(req.user, book_id)
    } catch (error) {
      throw error
    }
  }
  @Get('increse/:book_id')
  async increseQuantity(@Req() req: RequestWithAuth, @Param('book_id', ParseIntPipe) book_id: number) {
    try {
      return await this.cartService.increseQuantity(req.user, book_id)
    } catch (error) {
      throw error
    }
  }

}
