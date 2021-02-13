import {
  BadRequestException,
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const isValid = isValidObjectId(value);
    if (!isValid) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
