import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async KakaoLogout(accessToken: string) {
    const logoutUrl = `https://kapi.kakao.com/v1/user/unlink`;
    const accessHeader = {
      Authorization: `Bearer ${accessToken}`,
    };
    const result = await firstValueFrom(
      this.httpService.post(logoutUrl, '', {
        headers: accessHeader,
      }),
    );
    return result.status;
  }

  twentyFourHour = 24 * 60 * 60 * 1000;
  tenMinuit = 10 * 60 * 1000;

  jwtSignOptions = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_TOKEN_EXP,
  };

  async logIn(req, res) {
    // console.log(req.user);
    const token = await this.createToken(req);
    res.setHeader('Authorization', 'Bearer ' + Object.values(token));
    res.cookie('accessToken', token.accessToken, {
      maxAge: this.tenMinuit, // 24시간 (초 단위)
      httpOnly: true,
    });
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
    });
  }

  async logIn_test(user,) {
    // console.log(user);
    const token = await this.createToken(user);
    return token
    // res.setHeader('Authorization', 'Bearer ' + Object.values(token));
    // res.cookie('accessToken', token.accessToken, {
    //   maxAge: this.tenMinuit, // 24시간 (초 단위)
    //   httpOnly: true,
    // });
    // res.cookie('refreshToken', token.refreshToken, {
    //   httpOnly: true,
    // });
  }

  async createToken(user) {

    // 유저 인증 및 토큰 발급
    const accessToken = await this.createAccessToken(user.provider, user.name);
    const refreshToken = await this.createRefreshToken(user.providerId);

    await this.userService.tokenSave(
      user.provider,
      user.providerId,
      accessToken,
      user.kakaoAccessToken,
      refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  // access_token 발급
  async createAccessToken(provider: string, name: string): Promise<string> {
    const payload = {
      provider,
      name,
    };

    const access_token = await this.jwtService.signAsync(
      payload,
      this.jwtSignOptions,
    );

    return access_token;
  }

  // refresh_token 발급
  async createRefreshToken(providerId: number): Promise<string> {
    const payload = {
      providerId,
    };

    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.jwtSignOptions,
    );

    return refreshToken;
  }

  async recreateAccessToken(time: number, user) {
    const { provider, providerId, name } = user;
    const accessToken = await this.createAccessToken(provider, name);
    await this.userService.saveAccessToken(provider, providerId, accessToken);
    return accessToken;
  }

  async deleteToken(res) {
    res.cookie('accessToken', '', {
      maxAge: 0,
    });
    res.cookie('refreshToken', '', {
      maxAge: 0,
    });
  }
}
