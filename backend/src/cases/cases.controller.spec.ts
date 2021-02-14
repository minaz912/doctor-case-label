import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { Types } from 'mongoose';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { CaseDocument } from './schemas/case.schema';

describe('CasesController', () => {
  let controller: CasesController;
  let service: CasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [
        {
          provide: CasesService,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getNextUnlabeled: () => {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setConditionLabel: () => {},
          },
        },
      ],
    }).compile();

    controller = module.get<CasesController>(CasesController);
    service = module.get<CasesService>(CasesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNextUnlabeled', () => {
    it('should return a case', async () => {
      jest.spyOn(service, 'getNextUnlabeled').mockImplementation(() =>
        Promise.resolve(({
          _id: Types.ObjectId(),
          description: 'test',
        } as unknown) as CaseDocument),
      );

      const unlabeled = await controller.getNextUnlabeled();
      expect(unlabeled).toBeDefined();
    });
  });

  describe('setConditionLabel', () => {
    it('should update condition and return updated case', async () => {
      const existingCase = {
        _id: Types.ObjectId(),
        description: 'test',
      };
      const userId = Types.ObjectId();
      const conditionLabel = { code: 'S638X9A' };

      jest.spyOn(service, 'setConditionLabel').mockImplementation(
        (_id, labeledBy, code) =>
          (Promise.resolve({
            ...existingCase,
            labeledBy,
            condition: { code },
          }) as Promise<unknown>) as Promise<CaseDocument>,
      );

      const unlabeled = await controller.setConditionLabel(
        String(existingCase._id),
        ({ user: { _id: userId } } as unknown) as Request,
        conditionLabel,
      );

      expect(String(unlabeled._id)).toBe(String(existingCase._id));
      expect(unlabeled.condition.code).toBe(conditionLabel.code);
    });
  });
});
