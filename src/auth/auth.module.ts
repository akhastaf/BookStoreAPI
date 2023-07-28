import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStartegy } from './strategies/jwt.startegy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RefreshToken } from './strategies/refreshToken.strategy';
import { GoogleOAuthStrategy } from './strategies/google.oauth.strategy';
import { FacebookOAuthStrategy } from './strategies/facebook.oauth.strategy';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UserModule, JwtModule, ConfigModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStartegy, RefreshToken, GoogleOAuthStrategy, FacebookOAuthStrategy]
})
export class AuthModule {}
