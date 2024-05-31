import { Controller, Get, Param } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  async findAll() {
    return await this.noticeService.getNotices();
  }

  @Get('id/:id')
  async getNotice_id(@Param('id') id) {
    return await this.noticeService.getNotice_id(id);
  }

  @Get('title/:title')
  async getNotice_title(@Param('title') title) {
    return await this.noticeService.getNotice_title(title);
  }

  @Get('imageUrl/:id')
  async getNotice_text(@Param('id') id) {
    return await this.noticeService.getNotice_imageUrl(id);
  }
}
