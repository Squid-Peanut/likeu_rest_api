import {
  Bind,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { UsersService } from './users/users.service';
import { NoticeService } from './notice/notice.service';
import { usersMulterDiskOptions } from './users/multer/multer.options';
import { noticeMulterDiskOptions } from './notice/multer/multer.options';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth/auth.service';
import { GoogleAuthGuard } from './auth/auth.gard';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly noticeService: NoticeService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/input_user')
  @UseInterceptors(FilesInterceptor('file', null, usersMulterDiskOptions))
  @Bind(UploadedFiles())
  async postUsers(
    file: File[],
    @Body() body: { description: string; price: number },
    @Res() res: Response,
  ): Promise<any> {
    const price = Number(body.price);
    if (isNaN(price))
      return res.send(
        '<script>alert("id 또는 price의 형식이 숫자가 아닙니다."); window.location.href="/";</script>',
      );
    await this.usersService.postUsers(body.description, body.price, file);
    return res.redirect('/');
  }

  @Post('/update_user')
  async updateUser(
    @Body() body: { id: number; description: string; price: number },
    @Res() res: Response,
  ): Promise<any> {
    const id = Number(body.id);
    const price = Number(body.price);
    if (isNaN(id) || isNaN(price))
      return res.send(
        '<script>alert("id 또는 price의 형식이 숫자가 아닙니다."); window.location.href="/";</script>',
      );
    const result = await this.usersService.updateUsers(
      body.id,
      body.description,
      body.price,
    );
    if (result.modifiedCount == 1) return res.redirect('/');
    else
      return res.send(
        '<script>alert("존재하지 않는 데이터입니다."); window.location.href="/";</script>',
      );
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
  async getKakaoLogin(@Res() res: Response) {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.KAKAO_CODE_REDIRECT_URI}`;
    res.redirect(url);
  }

  @Get('/kakao/logout')
  async getKakaoLogout(@Res() res: Response) {
    await this.authService.KakaoLogout();
    res.redirect('/');
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Get('google/logout')
  async logout(@Session() session: Record<string, any>, @Res() res) {
    session.destroy();
    res.redirect('/');
  }

  @Get('session')
  async session(@Req() req: Request, @Res() res: Response) {
    console.log(req.session);
    return res.redirect('/');
  }
}
