interface GoogleUser {
  provider: 'google';
  providerId: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

export type GoogleRequest = Request & { user: GoogleUser };
