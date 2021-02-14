import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CasesService } from './cases.service';

describe('CasesService', () => {
  let service: CasesService;

  class CaseModel {
    static create = jest.fn().mockImplementation((input) => input);
    static findOne = jest.fn().mockImplementation(() => {
      return {
        _id: Types.ObjectId(),
        description: 'Example',
      };
    });
    static findById = jest.fn().mockImplementation((_id) => {
      return {
        _id: Types.ObjectId(_id),
        description: 'Example',
      };
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('Case'),
          useValue: CaseModel,
        },
        CasesService,
      ],
    }).compile();

    service = module.get<CasesService>(CasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a case based on input', async () => {
      const input = { description: 'Example' };
      const createdCase = await service.create(input);
      expect(CaseModel.create).toHaveBeenCalledWith(input);
      expect(createdCase).toEqual(input);
    });
  });

  describe('getById', () => {
    it('should return case based on id', async () => {
      const caseId = Types.ObjectId();
      const caseDoc = await service.getById(caseId);
      expect(CaseModel.findById).toHaveBeenCalledWith(caseId);
      expect(String(caseDoc._id)).toEqual(String(caseId));
    });
  });
});
