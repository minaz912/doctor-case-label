import { IsString, IsNotEmpty } from 'class-validator';
import { IsValidICD10ConditionCode } from '../validators/isValidICD10ConditionCode.validator';
export class SetConditionLabelDto {
  @IsString()
  @IsNotEmpty()
  @IsValidICD10ConditionCode()
  code: string;
}
