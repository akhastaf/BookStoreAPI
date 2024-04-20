import { Ability, ForbiddenError, ForcedSubject, MongoAbility, PureAbility, RawRuleOf, createMongoAbility, subject } from '@casl/ability';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Author } from 'src/author/entities/author.entity';
import { Award } from 'src/award/entites/award.entity';
import { Book } from 'src/book/entites/book.entity';
import { CartItem } from 'src/cart/entites/cart.entity';
import { Category } from 'src/category/entites/category.entity';
import { Discount } from 'src/discount/entites/discount.entity';
import { Order } from 'src/order/entites/order.entity';
import { Permission, Subject } from 'src/permission/entites/permission.entity';
import { PermissionService } from 'src/permission/permission.service';
import { Promotion } from 'src/promotion/entites/promotion.entity';
import { Publisher } from 'src/publisher/entites/publisher.entity';
import { Review } from 'src/review/entites/review.entity';
import { Role } from 'src/role/entites/role.entity';
import { Serie } from 'src/serie/entities/serie.entity';
import { Supplier } from 'src/supplier/entites/supplier.entity';
import { Translator } from 'src/translator/entites/translator.entity';
import { User } from 'src/user/entites/user.entity';
import { Wishlist } from 'src/wishlist/entites/wishlist.entity';
import { EntityManager, Repository } from 'typeorm';
import { CHECK_ABILITY, RequiredRule } from '../decorators/abilities.decorator';
import * as Mustache from 'mustache';
import { map, size } from 'lodash' 
import { RequestWithAuth } from 'src/types';

export const actions = [
  'read',
  'manage',
  'create',
  'update',
  'delete'
] as const;

export const subjects = [
  'author',
  'address',
  'award',
  'book',
  'cart',
  'category',
  'discount',
  'order',
  'permission',
  'promotion',
  'publisher',
  'review',
  'role',
  'serie',
  'supplier',
  'translator',
  'user',
  'wishlist'
] as const;

export type Abilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  )
];

export type AppAbility = MongoAbility<Abilities>;

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly permissionService: PermissionService,
    @InjectEntityManager() private readonly entityManager: EntityManager) {}

  createAbility = (rules: RawRuleOf<AppAbility>[]) =>
    createMongoAbility<AppAbility>(rules)
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const rules: any =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
      const request: RequestWithAuth = context.switchToHttp().getRequest();
    const currentUser: User = request.user;
    console.log('user', currentUser)

    const userPermissions = await this.permissionService.getUserPermissions(currentUser);

    // const parsedUserPermissions = this.parseCondition(
    //   userPermissions,
    //   currentUser
    // );
    // console.log(parsedUserPermissions)
    try {
      const ability = this.createAbility(Object(userPermissions))
      // this.createAbility(Object(parsedUserPermissions));

      for await (const rule of rules) {
        let sub = {};
        if (size(rule?.conditions)) {
          const subId = +request.params['id'];
          console.log("subId", subId)
          sub = await this.getSubjectById(subId, rule.subject);
        }
        console.log(sub);

        ForbiddenError.from(ability)
          .throwUnlessCan(rule.action, subject(rule.subject, sub));
      }
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  parseCondition(permissions: any, currentUser: User) {
    const data = map(permissions, (permission) => {
      if (size(permission.conditions)) {
        const parsedVal = Mustache.render(
          permission.conditions['created_by'],
          currentUser
        );
        return {
          ...permission,
          conditions: { created_by: +parsedVal }
        };
      }
      return permission;
    });
    return data;
  }

  private async getSubjectById(id: number, subject: string): Promise<any> {
    try {
      const repository: Repository<any> = this.entityManager.getRepository(subject);
      return repository.findOneByOrFail({
        where: {
          id: id
        }
      })
    } catch(e) {
      console.log("message ", e);
    }
  }
  
  private async getRepository(subject: string): Promise<Repository<any>> {
    try {
      switch (subject) {
        case Subject.USER:
          return this.entityManager.getRepository(User)
        
        case Subject.ROLE:
          return this.entityManager.getRepository(Role)
        
        case Subject.PERMISSION:
          return this.entityManager.getRepository(Permission)
        
        case Subject.AUTHOR:
          return this.entityManager.getRepository(Author)
        
        case Subject.PUBLISHER:
          return this.entityManager.getRepository(Publisher)
        
        case Subject.TRANSLATOR:
          return this.entityManager.getRepository(Translator)
        
        case Subject.SUPPLIER:
          return this.entityManager.getRepository(Supplier)
        
        case Subject.AWARD:
          return this.entityManager.getRepository(Award)
        
        case Subject.CATEGORY:
          return this.entityManager.getRepository(Category)
        
        case Subject.SERIE:
          return this.entityManager.getRepository(Serie)
        
        case Subject.BOOK:
          return this.entityManager.getRepository(Book)
        
        case Subject.CART:
          return this.entityManager.getRepository(CartItem)
        
        case Subject.WISHLIST:
          return this.entityManager.getRepository(Wishlist)
        
        case Subject.DISCOUNT:
          return this.entityManager.getRepository(Discount)
        
        case Subject.ADDRESS:
          return this.entityManager.getRepository(Address)
        
        case Subject.ORDER:
          return this.entityManager.getRepository(Order)
        
        case Subject.PROMOTION:
          return this.entityManager.getRepository(Promotion)
        
        case Subject.REVIEW:
          return this.entityManager.getRepository(Review)
        
        default:
          throw new NotFoundException(`the ${subject} subject found`)
        
      }
    } catch (e) {
      console.log("message ", e);
    }
    
  }
}
