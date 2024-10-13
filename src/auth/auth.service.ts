import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;

    const [userByUsername, userByEmail] = await Promise.all([
      this.usersService.findByUsername(username),
      this.usersService.findByEmail(email),
    ]);

    if (userByUsername) {
      throw new ConflictException('username already used');
    }

    if (userByEmail) {
      throw new ConflictException('email already used');
    }

    return this.usersService.create(createUserDto);
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('user not found');

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword)
      throw new UnauthorizedException('invalid credentials');

    return { userId: user.id };
  }
}
