import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoggedUserOutput } from 'src/users/dto/logged-user.output';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // async validate(email: string, password: string): Promise<User | null> {
  //   const user = await this.usersService.findOneByEmail(email);
  //   if (!user) return null;
  //   const passwordIsValid = password === user.password;
  //   return passwordIsValid ? user : null;
  // }

  async validateUser(email: string, password: string): Promise<null | User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
  }

  generateUserCredential(user: User): LoggedUserOutput {
    const payload = JSON.parse(JSON.stringify(user));
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
