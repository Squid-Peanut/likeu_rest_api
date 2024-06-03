import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.accessToken,
      ]),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async authenticate(req: Request) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const accessToken = req.cookies.accessToken;

      if (!accessToken && refreshToken) {
        const user = await this.usersService.findRefreshToken(refreshToken);
        if (user && refreshToken === user.refreshToken) {
          const newAccessToken = await this.authService.recreateAccessToken(
            600,
            user,
          ); // 10분
          req.res.cookie('accessToken', newAccessToken, {
            maxAge: 600 * 1000, // 10분 (밀리초 단위)
            httpOnly: true,
          });
          return this.success(user); // 성공시 Passport에게 사용자 전달
        }
      }
      if (accessToken && refreshToken) {
        const user = await this.usersService.findAccessToken(accessToken);
        if (user && accessToken === user.accessToken) {
          return this.success(user); // 성공시 Passport에게 사용자 전달
        }
      }
      if (!accessToken && !refreshToken) return this.pass();
      throw new UnauthorizedException();
    } catch (error) {
      this.error(error); // 실패시 Passport에게 에러 전달
    }
  }
}
