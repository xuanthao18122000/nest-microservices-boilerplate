import { User } from "apps/user-service/src/domain/entities/user.entity";
import { UserRepository } from "apps/user-service/src/infrastructure/repositories/user.repository";

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = new User();
    user.fullName = 'John Doe';
    user.email = 'john@example.com';
    user.password = 'password123';

    const createdUser = await userRepository.create(user);
    expect(createdUser).toBe(user);
  });

  it('should update a user', async () => {
    const user = new User();
    user.fullName = 'John Doe';
    user.email = 'john@example.com';
    user.password = 'password123';

    await userRepository.create(user);

    user.fullName = 'John Updated';
    const updatedUser = await userRepository.save(user);
    expect(updatedUser.fullName).toBe('John Updated');
  });

  it('should find all users', async () => {
    const user1 = new User();
    user1.fullName = 'John Doe';
    user1.email = 'john@example.com';
    user1.password = 'password123';
    await userRepository.create(user1);

    const user2 = new User();
    user2.fullName = 'Jane Doe';
    user2.email = 'jane@example.com';
    user2.password = 'password123';
    await userRepository.create(user2);

    const users = await userRepository.find();
    expect(users.length).toBe(2);
  });
});
