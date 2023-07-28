import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { OAuth2Strategy } from "passport-google-oauth"
import { use } from "passport";
import { User } from "src/user/entites/user.entity";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(OAuth2Strategy, 'google_oauth2') {
    constructor(private readonly authService: AuthService) {
        super({
            authorizationURL: process.env.GOOGLE_AUTHORIZATION_URL,
            tokenURL: process.env.GOOGLE_TOKEN_URL,
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
            accessType: 'offline',
            scope: ['profile', 'email']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, cb: any) {
        try {
            const user: User = await this.authService.validateUserForProvider(
                profile.emails[0].value,
                profile.displayName,
                'google'
            )
            cb(null, user)
            return user
        } catch (error) {
            throw error
        }
    }
}