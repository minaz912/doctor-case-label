import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsValidICD10ConditionCode } from '../validators/isValidICD10ConditionCode.validator';

export class SetConditionLabelDto {
  @IsString()
  @IsNotEmpty()
  @IsValidICD10ConditionCode()
  @ApiProperty()
  code: string;
}
