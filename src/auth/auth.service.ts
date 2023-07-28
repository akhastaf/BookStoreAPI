import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/user/entites/user.entity';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from 'src/types';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassowrd.dto';
import { EntityNotFoundError } from 'typeorm';
import {TokenExpiredError } from 'jsonwebtoken'
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        try {
            const user: User = await this.userService.create(registerDto)
            this.mailService.sendUserEmailConfirmation(user)
            return { message: 'User registered successfully' }
        } catch (error) {
            throw error
        }
    }

    async login(user: User): Promise<Tokens> {
        try {
            const payload : JwtPayload = { sub: user.id, email: user.email }
            return { access_token: this.jwtService.sign(payload, {
                            secret: this.configService.get('JWT_SECRET'),
                            expiresIn: this.configService.get('JWT_EXPIRATION')
                        }), 
                    refresh_token: this.jwtService.sign(payload, {
                        secret: this.configService.get('JWT_REFRESH_SECRET'),
                        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION')
                    }), 
            }
        } catch (error) {
            throw new InternalServerErrorException('cant sign the tokens')
        }
    }

    async forgotPassword(forgetPasswordDto: ForgetPasswordDto) : Promise<any> {
        try {
            const user: User = await this.userService.getByEmail(forgetPasswordDto.email)
            if (!user.is_verified)
                throw new UnauthorizedException('You need to validate your account first')
            const payload: JwtPayload = { sub: user.id, email: user.email }
            const password_reset_token: string = this.jwtService.sign(payload, {
                expiresIn: this.configService.get('RESET_PASSWORD_EXPARATION'),
                secret: this.configService.get('JWT_SECRET')
            })
            await this.mailService.sendPasswordResetLink(user)
            console.log(password_reset_token)
            await this.userService.updatePasswordResetToken(user, password_reset_token)
            return { message: 'password reset link was sent to your email '}
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new BadRequestException('Email is not found')
            throw error
        }
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) : Promise<any> {
        try {
            const payload: JwtPayload = await this.jwtService.verify(resetPasswordDto.token, {
                secret: this.configService.get('JWT_SECRET')
            })
            const user : User = await this.userService.getByEmail(payload.email)
            if (resetPasswordDto.token === user.password_reset_token) {
                await this.userService.updatePassword(user, resetPasswordDto.password)
                return { message : 'your password has been changed'}
            }
            throw new BadRequestException('token or email are invalid')
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new BadRequestException('Email is not found')
            if (error instanceof TokenExpiredError)
                throw new BadRequestException('token are expired')
            throw error
        }
    }

    async verifyEmail(token: string): Promise<any> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_EMAIL_VERIFICATION_SECRET'),
                ignoreExpiration: true
            })
            console.log(payload)
            console.log(payload.email)
            const userToVerify: User = await this.userService.getByEmail(payload.email)
            console.log(userToVerify)
            if (userToVerify.verification_token != token)
                throw new Error()
            const user: User = await this.userService.updateEmailVerificationStatus(userToVerify)
            const tokens: Tokens = await this.login(user)
            return { user, tokens, message: 'Email verified successfully' }
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new BadRequestException('Email is not found')
            throw new BadRequestException('token or email are not valid')
        }
    }

    async refreshToken(user: User): Promise<Tokens> {
        try {
            return this.login(user)
        } catch (error) {
            throw new InternalServerErrorException('cant sign the tokens')
        }
    }

    async validateUser(email: string, password: string): Promise<User> {
        try {
            const user = await this.userService.getByEmail(email)
            console.log('user', user)
            console.log('password', password)
            const verify = await bcrypt.compare(password, user.password)
            const p = await bcrypt.hash(password, 10)
            console.log(p===user.password)
            console.log(p)
            console.log('verify', verify)
            if (!verify)
                throw new UnauthorizedException('Invalid credentials')
            return user
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new BadRequestException('Email is not found')
            throw error
        }
    }

    async validateUserForProvider(email: string, name: string, provider: string): Promise<User> {
        try {
            console.log('email', email, 'name', name, 'provider', provider)
            return await this.userService.getByEmail(email)
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                return await this.userService.createForProvider(email, name, provider)
            throw error
        }
    }
}
