import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/user/entites/user.entity';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendUserEmailConfirmation(user: User) {
        try {
            const url: string = `https://localhost/auth/verify-email?token=${user.verification_token}`
            const t = await this.mailerService.sendMail({
                to: user.email,
                subject: 'email verification',
                template: './confirmation',
                context: {
                    name: user.name,
                    url
                }
            })
        } catch (error) {
            throw new InternalServerErrorException('error when sending confirmation email')
        }
    }

    async sendPasswordResetLink(user: User) {
        try {
            const url: string = `https://localhost/auth/reset-password?token=${user.password_reset_token}`
            const t = await this.mailerService.sendMail({
                to: user.email,
                subject: 'password reset',
                template: './reset_password',
                context: {
                    name: user.name,
                    url
                }
            })
        } catch (error) {
            throw new InternalServerErrorException('error when sending reset password email')
        }
    }
}
