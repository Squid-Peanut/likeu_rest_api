import { Controller, Get, Query, Redirect, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './auth.gard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Redirect('/')
  @Get('kakao')
  async getKakaoInfo(@Query() query: { code }) {
    const apikey = process.env.KAKAO_API_KEY;
    const redirectUri = process.env.KAKAO_CODE_REDIRECT_URI;
    await this.authService.kakaoLogin(apikey, redirectUri, query.code);
    await this.authService.KakaoUserInfo();
  }

  @Get('google')
  @Redirect('/')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback() {}
}
