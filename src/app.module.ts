import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/schemas/users.schema';
import { NoticeModule } from './notice/notice.module';
// import { KakaoModule } from './kakao/kakao.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    PassportModule.register({ global: true }),
    HttpModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, User],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    NoticeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    passport.serializeUser((user: any, done) => {
      const name = user.firstName + user.lastName;
      done(null, name); // 사용자 ID만 세션에 저장
    });

    passport.deserializeUser(async (name: string, done) => {
      try {
        done(null, name);
      } catch (error) {
        done(error);
      }
    });
  }
}
