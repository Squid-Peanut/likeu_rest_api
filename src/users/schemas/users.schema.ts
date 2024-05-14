// /src/user/schema/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MongoDB의 가장 작은 단위가 Document, 모듈에서 사용할 타입을 export 시켜줌
export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  @Prop()
  id: number;

  @Prop()
  description: string;
  static id: any;

  @Prop()
  price: number;

  // id: '1',
  //       title: 'Node.js 101',
  //       description: '웹 개발로 알아보는 백엔드 자바스크립트의 이해',
  //       price: 20000,
  //       courseImg: '',
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const UserSchema = SchemaFactory.createForClass(User);
