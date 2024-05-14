import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { UsersService } from './users/users.service';
import { NoticeService } from './notice/notice.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly noticeService: NoticeService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/input_user')
  postUsers(
    @Body() body: { description: string; price: number },
    @Res() res: Response,
  ): any {
    this.usersService.postUsers(body.description, body.price);
    return res.redirect('/');
  }

  @Post('/update_user')
  updateUser(
    @Body() body: { id: number; description: string; price: number },
    @Res() res: Response,
  ): any {
    this.usersService.updateUsers(body.id, body.description, body.price);
    return res.redirect('/');
  }

  @Post('/input_notice')
  postNotice(
    @Body() body: { title: string; text: string },
    @Res() res: Response,
  ): any {
    this.noticeService.postNotice(body.title, body.text);
    return res.redirect('/');
  }

  @Post('/update_notice')
  updateNotice(
    @Body() body: { id: number; title: string; text: string },
    @Res() res: Response,
  ): any {
    this.noticeService.updateNotice(body.id, body.title, body.text);
    return res.redirect('/');
  }
}
