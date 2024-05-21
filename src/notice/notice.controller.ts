import { Controller, Get, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  findAll(
    @Query('id') id: string,
    @Query('title') title: string,
    @Query('text') text: string,
    @Query('imageUrl') imageUrl: string,
  ) {
    if (
      id != undefined &&
      title == undefined &&
      text == undefined &&
      imageUrl == undefined
    )
      return this.noticeService.getNotice_id(id);
    else if (
      id == undefined &&
      title != undefined &&
      text == undefined &&
      imageUrl == undefined
    )
      return this.noticeService.getNotice_title(title);
    else if (
      id == undefined &&
      title == undefined &&
      text != undefined &&
      imageUrl == undefined
    )
      return this.noticeService.getNotice_text(text);
    else if (
      id == undefined &&
      title != undefined &&
      text != undefined &&
      imageUrl == undefined
    )
      return this.noticeService.getNotice_title_text(title, text);
    else if (
      id != undefined &&
      title == undefined &&
      text == undefined &&
      imageUrl != undefined
    )
      return this.noticeService.getNotice_imageUrl(id, imageUrl);
    else return this.noticeService.getNotices();
  }
}
