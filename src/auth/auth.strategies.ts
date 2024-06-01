import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_API_KEY,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ['email', 'profile', 'openid'],
    });
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, id } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      firstName: name.familyName,
      lastName: name.givenName,
      accessToken,
      refreshToken,
    };
    done(null, user);
    return user;
  }
}
