import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Model, Types } from 'mongoose';
import { exec } from 'child_process';
import { promisify } from 'util';
import { JwtAuthGuard } from '../src/auth/jwtAuth.guard';
import { CaseDocument } from 'src/cases/schemas/case.schema';
import { UserDocument } from 'src/users/schemas/user.schema';

describe('CasesController (e2e)', () => {
  let app: INestApplication;

  jest.setTimeout(25000);

  const execAsync = promisify(exec);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { _id: Types.ObjectId() };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    // Clear any seed data
    const caseModel = app.get<Model<CaseDocument>>('CaseModel');
    const userModel = app.get<Model<UserDocument>>('UserModel');
    await Promise.all([caseModel.deleteMany({}), userModel.deleteMany({})]);

    // Seed new data
    await Promise.all([
      execAsync('npm run seed:users'),
      execAsync('npm run seed:cases'),
    ]);
  });

  describe('/cases/unlabeled (GET)', () => {
    it('should return a case doc', async () => {
      return request(app.getHttpServer())
        .get('/cases/unlabeled')
        .expect(200)
        .expect(
          (res) =>
            typeof res.body._id === 'string' &&
            typeof res.body.description === 'string',
        );
    });
  });

  describe('/cases/:caseId (PUT)', () => {
    it('should set condition code based on input', async () => {
      const caseModel = app.get<Model<CaseDocument>>('CaseModel');
      const randomCase = await caseModel.findOne();

      return request(app.getHttpServer())
        .put(`/cases/${String(randomCase._id)}`)
        .send({ code: 'B302' })
        .expect(200)
        .expect(
          (res) =>
            typeof res.body.description === 'string' &&
            res.body._id === String(randomCase._id) &&
            res.body.code === 'B302',
        );
    });

    it('should not allow setting an invalid condition code', async () => {
      const caseModel = app.get<Model<CaseDocument>>('CaseModel');
      const randomCase = await caseModel.findOne();

      return request(app.getHttpServer())
        .put(`/cases/${String(randomCase._id)}`)
        .send({ code: 'INVALID_CODE' })
        .expect(400);
    });
  });
});
