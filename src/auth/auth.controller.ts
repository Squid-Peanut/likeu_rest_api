import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Redirect('/')
  @Get('kakao')
  async getKakaoInfo(@Query() query: { code }) {
    const apikey = process.env.KAKAO_API_KEY;
    const redirectUri = process.env.CODE_REDIRECT_URI;
    await this.authService.kakaoLogin(apikey, redirectUri, query.code);
    await this.authService.KakaoUserInfo();
  }
}
