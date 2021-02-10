import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Condition, ConditionSchema } from './condition.schema';

@Schema({ timestamps: true })
export class Case {
  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: ConditionSchema, required: false })
  condition?: Condition;

  @Prop({ type: Types.ObjectId, required: false })
  labeledBy?: Types.ObjectId;

  @Prop({ type: Date, required: false })
  labeledAt?: Date;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
