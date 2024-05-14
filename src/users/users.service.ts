import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUser_id(id: string): Promise<any> {
    const result = await this.userModel.find({ id }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getUser_description(description: string): Promise<any> {
    const result = await this.userModel.find({ description }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getUser_price(price: number): Promise<any> {
    const result = await this.userModel.find({ price }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getUser_description_price(
    description: string,
    price: number,
  ): Promise<any> {
    const result = await this.userModel.find({ description, price }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getUsers(): Promise<any> {
    const result = await this.userModel.find().lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async postUsers(description: string, price: number): Promise<any> {
    let id = (await this.userModel.find().lean()).length;
    id += 1;
    const result = await this.userModel.create({ id, description, price });
    if (!result) throw new NotFoundException();
    return result;
  }

  async updateUsers(
    id: number,
    description: string,
    price: number,
  ): Promise<any> {
    const search = await this.userModel.findOne({ id }).lean();
    if (search != undefined) {
      const result = await this.userModel.updateOne({ id, description, price });
      return result;
    }
  }
}
