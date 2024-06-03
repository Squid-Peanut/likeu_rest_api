import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { GoogleAuthGuard } from './auth.gard';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';

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
}
