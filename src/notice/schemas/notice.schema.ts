// /src/user/schema/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MongoDB의 가장 작은 단위가 Document, 모듈에서 사용할 타입을 export 시켜줌
export type NoticeDocument = Notice & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Notice {
  @Prop()
  id: number;

  @Prop()
  title: string;
  static id: any;

  @Prop()
  text: string;

  @Prop()
  imageUrl: string[];
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const NoticeSchema = SchemaFactory.createForClass(Notice);
