// src/user/presentation/controllers/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'apps/user-service/src/application/controllers/user.controller';
import { CreateUserDto } from 'apps/user-service/src/application/dto/user/create-user.dto';
import { UpdateUserDto } from 'apps/user-service/src/application/dto/user/update-user.dto';
import { UserResponseDto } from 'apps/user-service/src/application/dto/user/user-response.dto';
import { CreateUserUseCase } from 'apps/user-service/src/application/use-cases/user/create-user.use-case';
import { GetAllUserUseCase } from 'apps/user-service/src/application/use-cases/user/get-all-user.use-case';
import { GetOneUserUseCase } from 'apps/user-service/src/application/use-cases/user/get-one-user.use-case';
import { UpdateUserUseCase } from 'apps/user-service/src/application/use-cases/user/update-user.use-case';


describe('UserController', () => {
  let controller: UserController;
  let createUserUseCase: CreateUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  let getOneUserUseCase: GetOneUserUseCase;
  let getAllUserUseCase: GetAllUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: { execute: jest.fn().mockResolvedValue(new UserResponseDto()) },
        },
        {
          provide: UpdateUserUseCase,
          useValue: { execute: jest.fn().mockResolvedValue(new UserResponseDto()) },
        },
        {
          provide: GetOneUserUseCase,
          useValue: { execute: jest.fn().mockResolvedValue(new UserResponseDto()) },
        },
        {
          provide: GetAllUserUseCase,
          useValue: { execute: jest.fn().mockResolvedValue([new UserResponseDto()]) },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    getOneUserUseCase = module.get<GetOneUserUseCase>(GetOneUserUseCase);
    getAllUserUseCase = module.get<GetAllUserUseCase>(GetAllUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = { fullName: 'John Doe', email: 'john@example.com', password: 'password123' } as CreateUserDto;
      const result = await controller.create(createUserDto);
      expect(result).toBeInstanceOf(UserResponseDto);
      expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateUserDto = { fullName: 'John Updated' } as UpdateUserDto;
      const result = await controller.update(1, updateUserDto);
      expect(result).toBeInstanceOf(UserResponseDto);
      expect(updateUserUseCase.execute).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('get', () => {
    it('should return one user by id', async () => {
      const result = await controller.get(1);
      expect(result).toBeInstanceOf(UserResponseDto);
      expect(getOneUserUseCase.execute).toHaveBeenCalledWith(1);
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const result = await controller.getAll({ page: 10, perPage: 0 });
      expect(result).toBeInstanceOf(Array);
      expect(getAllUserUseCase.execute).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });
});
