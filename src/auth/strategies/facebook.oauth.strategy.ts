import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-facebook";
import { User } from "src/user/entites/user.entity";

@Injectable()
export class FacebookOAuthStrategy extends PassportStrategy(Strategy, 'facebook_oauth2') {
    constructor(private readonly authService: AuthService) {
        super({
            // authorizationURL: process.env.FACEBOOK_AUTHORIZATION_URL,
            // tokenURL: process.env.FACEBOOK_TOKEN_URL,
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK,
            profileFields: ['id', 'displayName', 'photos', 'email'],
            // profileFields: ['id', 'name', 'emails']
            // scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, cb: any) {
        try {
            console.log(profile, accessToken, refreshToken, cb)
            // return await this.authService.validateUserForProvider()
            const user: User = await this.authService.validateUserForProvider(
                profile.emails[0].value,
                profile.displayName,
                'facebook'
            )
            return user
        } catch (error) {
            console.log('error message', error.message)
            throw error
        }
    }
}