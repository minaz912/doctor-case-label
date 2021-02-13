import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Case, CaseDocument } from './schemas/case.schema';

@Injectable()
export class CasesService {
  constructor(@InjectModel(Case.name) private caseModel: Model<CaseDocument>) {}

  /**
   * Finds and returns a case by id, null otherwise
   */
  async getById(caseId: Types.ObjectId): Promise<CaseDocument | null> {
    return this.caseModel.findById(caseId);
  }

  /**
   * Finds and returns the next unlabeled case by creation time
   * (cases created earlier are returned first), nor null
   * if there are no unlabeled cases
   */
  async getNextUnlabeled(): Promise<CaseDocument | null> {
    return this.caseModel
      .findOne({
        labeledAt: null,
      })
      .sort({
        createdAt: 1,
      });
  }
}
