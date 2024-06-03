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

  async findOne(provider: string, providerId: number) {
    const result = await this.userModel
      .findOne({ provider }, { providerId })
      .lean();
    return result;
  }

  async findOneAsToken(cookie) {
    const accessToken = cookie.accessToken;
    const result = await this.userModel.findOne({ accessToken }).lean();
    return result;
  }

  async create(user) {
    const { provider, providerId, firstName, lastName, userName, email } = user;
    const result = await this.userModel.create({
      provider,
      providerId,
      userName: userName ? userName : firstName + lastName,
      email,
      data: { similarity_per_date: {} },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async tokenSave(
    provider: string,
    providerId: number,
    accessToken: string,
    kakaoAccessToken: string,
    refreshToken: string,
  ) {
    const result = await this.userModel.findOneAndUpdate(
      {
        provider,
        providerId,
      },
      { accessToken, kakaoAccessToken, refreshToken },
    );
    if (!result) throw new NotFoundException();
    return result;
  }

  async findRefreshToken(refreshToken: string) {
    const result = await this.userModel.findOne({ refreshToken }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }
  async findAccessToken(accessToken: string) {
    const result = await this.userModel.findOne({ accessToken }).lean();
    if (!result) throw new NotFoundException();
    return result;
  }

  async saveAccessToken(
    provider: string,
    providerId: number,
    accessToken: string,
  ) {
    const result = await this.userModel
      .findOneAndUpdate(
        {
          provider,
          providerId,
        },
        { accessToken },
      )
      .lean();
    if (!result) throw new NotFoundException();
    return result;
    // }
  }

  async deleteToken(cookie) {
    const { refreshToken } = cookie;
    await this.userModel.findOneAndUpdate(
      { refreshToken },
      { accessToken: '', refreshToken: '', kakaoAccessToken: '' },
    );
  }
}
