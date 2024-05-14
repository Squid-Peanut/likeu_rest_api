import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from './schemas/notice.schema';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}

  async getNotice_id(id: string): Promise<any> {
    const result = await this.noticeModel.find({ id }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotice_title(title: string): Promise<any> {
    const result = await this.noticeModel.find({ title }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotice_text(text: string): Promise<any> {
    const result = await this.noticeModel.find({ text }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotice_title_text(title: string, text: string): Promise<any> {
    const result = await this.noticeModel.find({ title, text }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotices(): Promise<any> {
    const result = await this.noticeModel.find().lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async postNotice(title: string, text: string): Promise<any> {
    let id = (await this.noticeModel.find().lean()).length;
    id += 1;
    const result = await this.noticeModel.create({ id, title, text });
    if (!result) throw new NotFoundException();
    return result;
  }

  async updateNotice(id: number, title: string, text: string): Promise<any> {
    const search = await this.noticeModel.findOne({ id }).lean();
    if (search != undefined) {
      const result = await this.noticeModel.updateOne({ id, title, text });
      return result;
    }
  }
}
