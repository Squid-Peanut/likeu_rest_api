import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { GoogleStrategy } from './strategy/auth.googleStrategy';
import { UsersModule } from '../users/users.module';
import { JwtAccessTokenStrategy } from './strategy/auth.tokenStrategy';
import { KakaoStrategy } from './strategy/auth.kakaoStrategy';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    KakaoStrategy,
    JwtAccessTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
