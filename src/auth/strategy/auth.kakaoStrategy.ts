import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Profile, Strategy } from 'passport-kakao';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.KAKAO_API_KEY,
      clientSecret: '',
      callbackURL: process.env.KAKAO_CODE_REDIRECT_URI,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const response = await axios.get(
      'https://kapi.kakao.com/v1/user/access_token_info',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const user = {
      provider: 'kakao',
      providerId: parseInt(profile.id),
      email: profile._json.kakao_account.email,
      userName: profile.displayName,
      kakaoAccessToken: accessToken,
      expiredIn: response.data.expiresInMillis,
    };
    const find = await this.usersService.findOne(
      user.provider,
      user.providerId,
    );

    if (!find) await this.usersService.create(user);

    return user;
  }
}
