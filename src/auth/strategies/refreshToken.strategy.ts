import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/types";
import { User } from "src/user/entites/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class RefreshToken extends PassportStrategy(Strategy, 'refresh_token') {
    constructor(private readonly configService: ConfigService,
                private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    
                    let token = null;
                    if (request && request.cookies) {
                        token = request.cookies['refresh_token'];
                    }
                    return token;
                    },
            ]),
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
        })
    }

    async validate(payload: JwtPayload) : Promise<User> {
        try {
            return this.userService.getByEmail(payload.email)
        } catch (error) {
            throw new UnauthorizedException('Refresh token invalid')
        }
    }
    
}