import { registerDecorator } from 'class-validator';
import { ICD10_CONDITION_CODES } from '../constants/conditions';

export function IsValidICD10ConditionCode() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsValidICD10ConditionCode',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          return ICD10_CONDITION_CODES.includes(value);
        },
      },
      options: {
        message: 'Code must be a valid ICD10 condition code',
      },
    });
  };
}
