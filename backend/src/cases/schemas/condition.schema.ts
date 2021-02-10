import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICD10_CONDITIONS } from '../constants/conditions';

@Schema()
export class Condition {
  @Prop({
    type: String,
    required: true,
    enum: ICD10_CONDITIONS.map((condition) => condition.code),
  })
  code: string;

  @Prop({
    type: String,
    required: true,
    enum: ICD10_CONDITIONS.map((condition) => condition.description),
  })
  description: string;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);
