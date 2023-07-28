import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PROVIDER, User } from './entites/user.entity';
import { fromString, uuid } from 'uuidv4';
import { use } from 'passport';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types';
import { ConfigService } from '@nestjs/config';
import { emit } from 'process';

@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,) {}

    async create(registerDto: RegisterDto): Promise<User> {
        try {
            const user = this.userRepository.create(registerDto)
            user.verification_token = this.jwtService.sign({ email: user.email }, {
                secret: this.configService.get('JWT_EMAIL_VERIFICATION_SECRET')
            })
            return await this.userRepository.save(user)
        } catch (error) {
            if (error.code === '23505')
                throw new BadRequestException('Email is already taken')
            throw error
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            return this.userRepository.findOneOrFail({
                where: {
                    email: email ?? '',
                }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError)
                throw new BadRequestException('Email is not found')
            throw error
        }
    }


    async updateEmailVerificationStatus(user: User) {
        try {
            const userToSave = await this.getByEmail(user.email)
            userToSave.is_verified = true
            userToSave.verification_token = null
            return await this.userRepository.save(userToSave)
        } catch (error) {
            throw error
        }
    }

    async updatePasswordResetToken(user: User, password_reset_token: string) : Promise<void> {
        try {
            await this.userRepository.update(user.id, { password_reset_token })
        } catch (error) {
            throw error
        }
    }
    
    async updatePassword(user: User, password: string) : Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            await this.userRepository.update(user.id, { password: hashedPassword })
        } catch (error) {
            throw error
        }
    }

    async createForProvider(email: string, name: string, provider: string): Promise<User> {
        try {
            console.log(email, name, provider)
            const user: User = this.userRepository.create({email, name, provider: provider as PROVIDER})
            return await this.userRepository.save(user)
        } catch (error) {
            if (error.code === '23505')
                throw new BadRequestException('Email is already taken')
            throw error
        }
    }

}
