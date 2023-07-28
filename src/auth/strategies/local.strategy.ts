import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/user/entites/user.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string) : Promise<User> {
        try {
            const user: User = await this.authService.validateUser(email, password)
            if (!user.is_verified)
                throw new UnauthorizedException('Verify your account first')
            return user
        } catch (error) {
            throw error//new UnauthorizedException(error.message)
        }
    }
}