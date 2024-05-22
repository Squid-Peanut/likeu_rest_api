import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUser_id(id: string): Promise<any> {
    const result = await this.userModel.find({ id }).select('-_id -__v').lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getUser_description(description: string): Promise<any> {
    const result = await this.userModel
      .find({ description })
      .select('-_id -__v')
      .lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getUser_price(price: number): Promise<any> {
    const result = await this.userModel
      .find({ price })
      .select('-_id -__v')
      .lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getUser_description_price(
    description: string,
    price: number,
  ): Promise<any> {
    const result = await this.userModel
      .find({ description, price })
      .select('-_id -__v')
      .lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getUser_imageUrl(id: string, imageUrl: string): Promise<any> {
    if (imageUrl == 'true') {
      const result = await this.userModel
        .find({ id })
        .select('-_id imageUrl')
        .lean();
      if (!result) throw new NotFoundException();
      return result;
    } else throw new NotFoundException();
  }

  async getUsers(): Promise<any> {
    const result = await this.userModel.find().select('-_id -__v').lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async postUsers(
    description: string,
    price: number,
    file: any[],
  ): Promise<any> {
    const imageUrl: string[] = [];
    let id = (await this.userModel.find().lean()).length;
    id += 1;
    for (let i = 0; i < file.length; i++) {
      imageUrl.push(`${process.env.HOST_URL}/users/${file[i].originalname}`);
    }

    console.log(imageUrl);

    const result = await this.userModel.create({
      id,
      description,
      price,
      imageUrl,
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async updateUsers(
    id: number,
    description: string,
    price: number,
  ): Promise<any> {
    return await this.userModel.updateOne({ id }, { description, price });
  }
}
