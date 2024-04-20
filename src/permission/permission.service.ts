import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entites/permission.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entites/user.entity';
import { RawRule } from '@casl/ability';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>) {}

    async getUserPermissions(user: User): Promise<RawRule[]> {
        try {
            const userPermissions: Permission[] = await this.permissionRepository.find({
                where: {
                    role: {
                        id: user.role.id
                    }
                }
            })

            const rawRules : RawRule[] = userPermissions.map((permission: Permission) : RawRule => {
                return {
                    action: permission.action,
                    subject: permission.subject,
                    fields: permission.fields,
                    conditions: permission.conditions,
                    inverted: permission.inverted,
                    reason : permission.reason,
                }
            })
            return rawRules
        } catch (error) {
            console.log(error)
        }
    }
}
