import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) =>
        Promise.resolve([{ email, password: 'azeaze', id: 5 } as User]),
      findOne: (id: number) =>
        Promise.resolve({ id, email: '', password: '' } as User),
      remove: (id: number) =>
        Promise.resolve({ id, email: '', password: '' } as User),
      update: (id: number) =>
        Promise.resolve({ id, email: '', password: '' } as User),
      create: (email: string, password: string) =>
        Promise.resolve({ email, password: 'azeaze', id: 5 } as User),
    };
    fakeAuthService = {
      signup: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('test@yopmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@yopmail.com');
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });
  it('findUser returns an error if the id is not existe', async () => {
    fakeUsersService.findOne = (id: number) => null;

    await expect(controller.findUser('88')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = {
      userId: 0,
    };
    const user = await controller.signin(
      { email: 'tes@yopmail.com', password: 'password' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
