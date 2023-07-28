import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/types";
import { User } from "src/user/entites/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        try {
            const user: User = await this.userService.getByEmail(payload.email)
            if (!user.is_verified)
                throw new UnauthorizedException('Verify your account first')
            return user
        } catch (error) {
            if (error instanceof UnauthorizedException)
                throw error
            throw new UnauthorizedException('user not exist')
        }
    } 
}