import { Body, Controller, Get, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { GoogleAuthGuard } from './auth.gard';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { userInfo } from 'os';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('kakao')
  @Redirect('/')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Res() res: Response, @Req() req: Request) {
    return await this.authService.logIn(req, res);
    // console.log(req.user);
  }

  @Get('google')
  @Redirect('/')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Res() res: Response, @Req() req: Request) {
    return await this.authService.logIn(req, res);
  }

  @Post('google/mobile')
  async googleLogin(@Res() res: Response,@Req() req:Request, @Body('userInfo') userInfo: any) {
    console.log(userInfo)
    const user = {
      provider: 'google',
      providerId: userInfo.data.user.id,
      email: userInfo.data.user.email,
      firstName: userInfo.data.user.familyName,
      lastName: userInfo.data.user.givenName,
      image: userInfo.data.user.photo
    };

    const find = await this.userService.findOne(
      user.provider,
      user.providerId,
    );

    if (!find) await this.userService.create(user);
    
    const Token = await this.authService.logIn_test(user);
    console.log(Token)

    return res.status(200).json(Token);
  }
}
