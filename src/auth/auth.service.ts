import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GoogleRequest } from './dto/auth.googleuser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  accessToken;

  async kakaoLogin(apikey: string, redirectUri: string, code: string) {
    const config = {
      grant_type: 'authorization_code',
      client_id: apikey,
      redirect_uri: redirectUri,
      code,
    };
    const params = new URLSearchParams(config).toString();
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const tokenUrl = `https://kauth.kakao.com/oauth/token?${params}`;

    const res = await firstValueFrom(
      this.httpService.post(tokenUrl, '', { headers: tokenHeaders }),
    );
    this.accessToken = res.data.access_token;
  }

  async KakaoUserInfo() {
    const userInfoUrl = `https://kapi.kakao.com/v2/user/me`;
    const userInfoHeaders = {
      Authorization: `Bearer ${this.accessToken}`,
    };
    const { data } = await firstValueFrom(
      this.httpService.get(userInfoUrl, { headers: userInfoHeaders }),
    );
    console.log(data);
  }

  async KakaoLogout() {
    console.log(this.accessToken);
    const logoutUrl = `https://kapi.kakao.com/v1/user/unlink`;
    const accessHeader = {
      Authorization: `Bearer ${this.accessToken}`,
    };
    await firstValueFrom(
      this.httpService.post(logoutUrl, '', {
        headers: accessHeader,
      }),
    );
    this.accessToken = '';
  }

  async googleLogin(req: GoogleRequest) {
    // const res = payload;
    const { user } = req;
    const result = {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
    return result;
  }
}
