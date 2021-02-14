import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ICD10_CONDITIONS,
  ICD10_CONDITION_CODES,
} from './constants/conditions';
import { Case, CaseDocument } from './schemas/case.schema';

@Injectable()
export class CasesService {
  constructor(@InjectModel(Case.name) private caseModel: Model<CaseDocument>) {}

  /**
   * Creates a new case
   */
  async create(input: Partial<CaseDocument>): Promise<CaseDocument> {
    return this.caseModel.create(input);
  }

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

  /**
   * Returns all possible ICD-10 condition codes and
   * their description
   */
  getConditions(): typeof ICD10_CONDITIONS {
    return ICD10_CONDITIONS;
  }

  /**
   * Sets the condition code and description on matching
   * case by id
   * Returns the updated case
   */
  async setConditionLabel(
    caseId: Types.ObjectId,
    labeledBy: Types.ObjectId,
    labelCode: typeof ICD10_CONDITION_CODES[number],
  ) {
    const caseForId = await this.getById(caseId);
    if (!caseForId) {
      throw new Error('Case not found');
    }

    const condition = ICD10_CONDITIONS.find(
      (condition) => condition.code === labelCode,
    );

    caseForId.set({
      labeledAt: new Date(),
      labeledBy,
      condition,
    });

    return caseForId.save();
  }
}
