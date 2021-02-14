import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const users = [
    {
      email: 'john_doe@example.com',
    },
    {
      email: 'jane_doe@example.com',
    },
  ];
  class UserModel {
    static create = jest.fn().mockImplementation((input) => input);
    static findOne = jest
      .fn()
      .mockImplementation(({ email }) =>
        users.find((user) => user.email === email),
      );
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('User'),
          useValue: UserModel,
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('[findByEmail]::should do a find operation with correct args', async () => {
    const email = 'john_doe@example.com';
    const user = await service.findByEmail(email);
    expect(UserModel.findOne).toHaveBeenCalledWith({
      email,
    });
    expect(user).toBeDefined();
  });

  it('[create]::should pass input to model', async () => {
    const input = {
      email: 'jane_doe@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'test',
    };
    const created = await service.create(input);
    expect(UserModel.create).toHaveBeenCalledWith(input);
    expect(created).toEqual(input);
  });
});
