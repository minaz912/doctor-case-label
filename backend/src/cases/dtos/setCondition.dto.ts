import { IsString, IsNotEmpty } from 'class-validator';
export class SetConditionLabelDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
