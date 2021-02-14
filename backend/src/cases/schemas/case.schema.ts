import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Condition, ConditionSchema } from './condition.schema';

@Schema({ timestamps: true })
export class Case {
  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: ConditionSchema, required: false })
  condition?: Condition;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: false,
  })
  labeledBy?: Types.ObjectId;

  @Prop({ type: Date, required: false })
  labeledAt?: Date;
}

export type CaseDocument = Case & Document;

export const CaseSchema = SchemaFactory.createForClass(Case);
