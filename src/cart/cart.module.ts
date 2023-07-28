import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { BookModule } from 'src/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entites/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]),BookModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
