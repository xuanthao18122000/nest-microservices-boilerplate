import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'apps/user-service/src/application/dto/user/create-user.dto';
import { CreateUserUseCase } from 'apps/user-service/src/application/use-cases/user/create-user.use-case';
import { User } from 'apps/user-service/src/domain/entities/user.entity';
import { UserRepository } from 'apps/user-service/src/infrastructure/repositories/user.repository';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: { create: jest.fn().mockResolvedValue(new User()) },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    } as CreateUserDto;
    
    const result = await createUserUseCase.execute(createUserDto);
    expect(result).toBeInstanceOf(User);
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));
  });
});
