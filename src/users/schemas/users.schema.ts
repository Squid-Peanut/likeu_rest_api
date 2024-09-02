import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MongoDB의 가장 작은 단위가 Document, 모듈에서 사용할 타입을 export 시켜줌
export type UserDocument = User & Document;

@Schema()
export class Similarity {
  @Prop()
  similarity: string[];
}
@Schema()
export class SimilarityPerDate {
  @Prop()
  date: string[];

  @Prop()
  similarity: string[];
}

@Schema()
export class Data {
  @Prop()
  similarity_per_date: SimilarityPerDate;

  @Prop()
  star_player: string[];
}
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  @Prop({ unique: true })
  providerId: number;

  @Prop({ unique: true })
  provider: string;

  @Prop()
  userName: string;

  @Prop()
  image: string;

  @Prop()
  email: string;

  @Prop()
  data: Data;

  @Prop()
  accessToken: string;

  @Prop()
  kakaoAccessToken: string;

  @Prop()
  refreshToken: string;
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const UserSchema = SchemaFactory.createForClass(User);
