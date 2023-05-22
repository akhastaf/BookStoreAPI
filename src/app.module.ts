import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';
import { PromotionModule } from './promotion/promotion.module';
import { RoleModule } from './role/role.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { TranslatorModule } from './translator/translator.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CartModule } from './cart/cart.module';
import { DiscountModule } from './discount/discount.module';
import { PermissionModule } from './permission/permission.module';
import { SupplierModule } from './supplier/supplier.module';
import { ReviewModule } from './review/review.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, BookModule, OrderModule, PromotionModule, RoleModule, AuthorModule, PublisherModule, TranslatorModule, CategoryModule, ImageModule, WishlistModule, CartModule, DiscountModule, PermissionModule, SupplierModule, ReviewModule, AddressModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
