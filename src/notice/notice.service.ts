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

  async getNotice_imageUrl(id: string, imageUrl: string): Promise<any> {
    if (imageUrl == 'true') {
      const result = await this.noticeModel
        .find({ id })
        .select('imageUrl')
        .lean();
      if (!result) throw new NotFoundException();
      return result;
    } else throw new NotFoundException();
  }

  async getNotices(): Promise<any> {
    const result = await this.noticeModel.find().lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async postNotice(title: string, text: string, file: any[]): Promise<any> {
    const imageUrl: string[] = [];
    let id = (await this.noticeModel.find().lean()).length;
    id += 1;
    for (let i = 0; i < file.length; i++) {
      imageUrl.push(`${process.env.HOST_URL}/notice/${file[i].originalname}`);
    }
    console.log(imageUrl);
    const result = await this.noticeModel.create({ id, title, text, imageUrl });
    if (!result) throw new NotFoundException();
    return result;
  }

  async updateNotice(id: number, title: string, text: string): Promise<any> {
    return await this.noticeModel.updateOne({ id }, { title, text });
  }
}
