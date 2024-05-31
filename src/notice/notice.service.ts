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
    const result = await this.noticeModel
      .find({ id })
      .select('-_id -__v')
      .lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotice_title(title: string): Promise<any> {
    const result = await this.noticeModel
      .find({ title })
      .select('-_id -__v')
      .lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotice_text(text: string): Promise<any> {
    const result = await this.noticeModel
      .find({ text })
      .select('-_id -__v')
      .lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotice_title_text(title: string, text: string): Promise<any> {
    const result = await this.noticeModel
      .find({ title, text })
      .select('-_id -__v')
      .lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotice_imageUrl(id: string): Promise<any> {
    const result = await this.noticeModel
      .find({ id })
      .select('-_id imageUrl')
      .lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getNotices(): Promise<any> {
    const result = await this.noticeModel.find().select('-_id -__v').lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async postNotice(title: string, text: string, file: any[]): Promise<any> {
    const imageUrl: string[] = [];
    let id = (await this.noticeModel.find().lean()).length;
    id += 1;
    for (let i = 0; i < file.length; i++) {
      const imgUrl = `${process.env.HOST_URL}/notice/${file[i].originalname}`;
      const imgToBase64 = Buffer.from(imgUrl).toString('base64');
      imageUrl.push(`data:${file[i].mimetype};base64,${imgToBase64}`);
    }
    console.log(file);
    const result = await this.noticeModel.create({
      id,
      title,
      text,
      imageUrl,
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async updateNotice(id: number, title: string, text: string): Promise<any> {
    return await this.noticeModel.updateOne({ id }, { title, text });
  }
}
