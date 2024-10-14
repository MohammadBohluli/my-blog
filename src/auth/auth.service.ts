import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import { AuthJwtPayload } from './types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly JwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

    return { userId: user.id, role: user.role };
  }

  login(user: any) {
    // TODO: change login to generate jwt
    const payload: AuthJwtPayload = { userId: user.userId, role: user.role };
    return this.JwtService.sign(payload);
  }

  generateRefreshToken(user: any) {
    const payload: AuthJwtPayload = { userId: user.userId, role: user.role };
    const options: JwtSignOptions = {
      secret: this.configService.getOrThrow('refreshSecret'),
      expiresIn: this.configService.getOrThrow('refreshExpiresIn'),
    };

    return this.JwtService.sign(payload, options);
  }
}
