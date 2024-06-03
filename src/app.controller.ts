import {
  Bind,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { UsersService } from './users/users.service';
import { NoticeService } from './notice/notice.service';
import { noticeMulterDiskOptions } from './notice/multer/multer.options';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly noticeService: NoticeService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async getHello(@Req() req: Request) {
    const cookie = req.cookies;
    const findUser = await this.usersService.findOneAsToken(cookie);
    return this.appService.getHello(findUser);
  }

  @Post('/input_notice')
  @UseInterceptors(FilesInterceptor('file', null, noticeMulterDiskOptions))
  @Bind(UploadedFiles())
  async postNotice(
    file: File[],
    @Body() body: { title: string; text: string },
    @Res() res: Response,
  ): Promise<any> {
    await this.noticeService.postNotice(body.title, body.text, file);
    return res.redirect('/');
  }

  @Post('/update_notice')
  async updateNotice(
    @Body() body: { id: number; title: string; text: string },
    @Res() res: Response,
  ): Promise<any> {
    const id = Number(body.id);
    if (isNaN(id))
      return res.send(
        '<script>alert("id의 형식이 숫자가 아닙니다."); window.location.href="/";</script>',
      );
    const result = await this.noticeService.updateNotice(
      body.id,
      body.title,
      body.text,
    );
    if (result.modifiedCount == 1) return res.redirect('/');
    else
      return res.send(
        '<script>alert("존재하지 않는 데이터입니다."); window.location.href="/";</script>',
      );
  }

  @Get('/kakao/login')
  @UseGuards(AuthGuard('kakao'))
  async getKakaoLogin() {}

  @Get('/kakao/logout')
  async kakaoLogout(@Req() req: Request, @Res() res: Response) {
    const cookie = req.cookies;
    const { kakaoAccessToken } = await this.usersService.findOneAsToken(cookie);
    const kakaoLogout = await this.authService.KakaoLogout(kakaoAccessToken);
    if (kakaoLogout == 200 || kakaoLogout != 200) {
      await this.authService.deleteToken(res);
      await this.usersService.deleteToken(req.cookies);
      return res.redirect('/');
    }
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/logout')
  async googleLogout(@Req() req: Request, @Res() res: Response) {
    await this.authService.deleteToken(res);
    await this.usersService.deleteToken(req.cookies);
    return res.redirect('/');
  }
}
