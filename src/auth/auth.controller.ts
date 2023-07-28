import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RequestWithAuth, Tokens } from 'src/types';
import { LoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassowrd.dto';
import { TwoFactorDto } from './dto/twoFactor.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entites/user.entity';
import { Response } from 'express';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { GoogleGuard } from './guards/google.guard';
import { FacebookGuard } from './guards/facebook.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {

  }
  
  @Post('register')
  async register(@Body() registerDto : RegisterDto): Promise<any> {
    try {
      return await this.authService.register(registerDto)
    } catch (error) {
      throw error
    }
  }

  @UseGuards(GoogleGuard)
  @Get('provider/google')
  async loginWithGoogle() {}

  @UseGuards(GoogleGuard)
  @Get('redirect/google')
  async callbackForGoogle(@Query() query: any, @Req() req: any, @Res() res: Response) {
    try {
      const tokens: Tokens = await this.authService.login(req.user)
      const expireIn = new Date()
      expireIn.setMonth(expireIn.getMonth() + 3)
      res.cookie('refresh_token', tokens.refresh_token, {
        expires: expireIn,
        secure: true,
        httpOnly: true
      })
      const { password, two_factor_secret, two_factor_recovery_code, password_reset_token, verification_token, ...user} = req.user
      res.send({ user, access_token: tokens.access_token})
    } catch (error) {
      throw error
    }
  }

  @UseGuards(FacebookGuard)
  @Get('provider/facebook')
  async loginWithFacebook() {}

  @UseGuards(FacebookGuard)
  @Get('redirect/facebook')
  async callbackForFacebook(@Query() query: any, @Req() req: any, @Res() res: Response) {
    try {
      console.log(query)
      console.log(req.user)
      return 'facebook'
      // const tokens: Tokens = await this.authService.login(req.user)
      // const expireIn = new Date()
      // expireIn.setMonth(expireIn.getMonth() + 3)
      // res.cookie('refresh_token', tokens.refresh_token, {
      //   expires: expireIn,
      //   secure: true,
      //   httpOnly: true
      // })
      // const { password, two_factor_secret, two_factor_recovery_code, password_reset_token, verification_token, ...user} = req.user
      // res.send({ user, access_token: tokens.access_token})
    } catch (error) {
      throw error
    }
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Res() res: Response, @Req() req: RequestWithAuth, @Body() userLoginDto: LoginDto) : Promise<any> {
    try {
      const tokens: Tokens = await this.authService.login(req.user)
      const expireIn = new Date()
      expireIn.setMonth(expireIn.getMonth() + 3)
      res.cookie('refresh_token', tokens.refresh_token, {
        expires: expireIn,
        secure: true,
        httpOnly: true
      })
      const { password, two_factor_secret, two_factor_recovery_code, password_reset_token, verification_token, ...user} = req.user
      res.send({ user, access_token: tokens.access_token})
    } catch (error) {
      throw error
    }
  }

  @UseGuards(JwtGuard)
  @Delete('logout')
  async logout(@Req() req: RequestWithAuth, @Res() res: Response): Promise<any> {
    res.clearCookie('refresh_token')
    res.send({ message: 'Logged out successfully' })
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgetPasswordDto: ForgetPasswordDto) : Promise<any> {
    try {
      return this.authService.forgotPassword(forgetPasswordDto)
    } catch (error) {
      throw error
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) : Promise<void> {
    try {
      return this.authService.resetPassword(resetPasswordDto)
    } catch (error) {
      throw error
    }
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() res: Response) : Promise<any> {
    try {
      const ret: any =  await this.authService.verifyEmail(token)
      const expireIn = new Date()
      expireIn.setMonth(expireIn.getMonth() + 3)
      res.cookie('refresh_token', ret.tokens.refresh_token, {
        expires: expireIn,
        secure: true,
        httpOnly: true
      })
      console.log('user:', ret.user)
      const { password, two_factor_secret, two_factor_recovery_code, password_reset_token, verification_token, ...user} = ret.user
      res.send({ user, access_token: ret.tokens.access_token, message: ret.message })
    } catch (error) {
      throw error
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  async refreshToken(@Req() req: RequestWithAuth, @Res() res: Response) : Promise<void> {
    try {
      const tokens: Tokens = await this.authService.refreshToken(req.user)
      const expireIn: Date = new Date()
      expireIn.setMonth(expireIn.getMonth() + 3)
      res.cookie('refresh_token', tokens.refresh_token, { 
        expires: expireIn,
        secure: true,
        httpOnly: true})
      res.send({ access_token: tokens.access_token })
    } catch (error) {
      throw error
    }
  }

  @Post('two-factor')
  async twoFactor(@Body() twoFactorDto: TwoFactorDto) : Promise<void> {}

}
