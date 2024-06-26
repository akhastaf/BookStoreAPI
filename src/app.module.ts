import { Module } from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm';
import { AwardModule } from './award/award.module';
import { SerieModule } from './serie/serie.module';
import { SearchModule } from './search/search.module';
import { MailModule } from './mail/mail.module';
import { MeilisearchModule } from './meilisearch/meilisearch.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    BookModule,
    OrderModule,
    PromotionModule,
    RoleModule,
    AuthorModule,
    PublisherModule,
    TranslatorModule,
    CategoryModule,
    ImageModule,
    WishlistModule,
    CartModule,
    DiscountModule,
    PermissionModule,
    SupplierModule,
    ReviewModule,
    AddressModule,
    AuthModule,
    AwardModule,
    SerieModule,
    SearchModule,
    MailModule,
    MeilisearchModule,
    AuthzModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
