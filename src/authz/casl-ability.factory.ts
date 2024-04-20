
import { Ability, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action, Permission } from "src/permission/entites/permission.entity";
import { User } from "src/user/entites/user.entity";

export type PermissionObjectType = any;
export type AppAbility = PureAbility<[Action, PermissionObjectType]>;
interface CaslPermission {
  action: Action;
  // In our database, Invoice, Project... are called "object"
  // but in CASL they are called "subject"
  subject: string;
}
@Injectable()
export class CaslAbilityFactory {
  constructor() {}
  async createForUser(user: User): Promise<AppAbility> {
    const dbPermissions: Permission[] = user.role.permissions;
    const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
      action: p.action as Action,
      subject: p.subject,
    }));
    return new Ability<[Action, PermissionObjectType]>(caslPermissions);
  }
}