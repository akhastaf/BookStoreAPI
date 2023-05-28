import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/register.dto';
import { RequestWithAuth } from 'src/types';
import { LoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassowrd.dto';
import { TwoFactorDto } from './dto/twoFactor.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {

  }
  
  @Post('register')
  async register(@Body() userRegistrationDto : RegistrationDto): Promise<void> {}

  @Post('login')
  async login(@Body() userLoginDto: LoginDto) : Promise<void> {}

  @Delete('logout')
  async logout(@Req() req: RequestWithAuth): Promise<void> {}

  @Post('forgot-password')
  async forgotPassword(@Body() forgetPasswordDto: ForgetPasswordDto) : Promise<void> {}

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) : Promise<void> {}

  @Get('verify-email')
  async verifyEmail(@Param(':email') email: string, @Param(':token') token: string) : Promise<void> {}

  @Get('refresh-token')
  async refreshToken(@Req() req: RequestWithAuth) : Promise<void> {}

  @Post('two-factor')
  async twoFactor(@Body() twoFactorDto: TwoFactorDto) : Promise<void> {}

}
