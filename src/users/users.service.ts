import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/common/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { LoggedUserOutput } from './dto/logged-user.output';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const saltOrRounds = 10;
    const password = createUserInput.password;
    createUserInput.password = await bcrypt.hash(password, saltOrRounds);
    const newUser = this.usersRepository.save({
      email: createUserInput.email,
      password: createUserInput.password,
    });
    return newUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async loginUser(loginUserInput: LoginUserInput): Promise<LoggedUserOutput> {
    const user = await this.authService.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    if (!user) {
      throw new BadRequestException('Email or password are invalid');
    }

    return this.authService.generateUserCredential(user);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
