import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/services/users.service';
import { SigninDto } from '../../dtos/signin.dto';
import { CurrentUser } from '../../types/current-user.type';
import { AuthJwtPayload } from '../../types/jwt-payload.type';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly verificationService: VerificationService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  async signout(userId: number) {
    await this.usersService.updateHashRefreshToken(userId, null);
  }

  async signin(user: CurrentUser) {
    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateHashRefreshToken(
      user.userId,
      hashRefreshToken,
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(user: CurrentUser) {
    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateHashRefreshToken(
      user.userId,
      hashRefreshToken,
    );

    return { accessToken, refreshToken };
  }

  async validateUser(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('user not found');

    if (!user.isActive) {
      await this.verificationService.sendVerificationCode(user);
      throw new UnauthorizedException(
        'Your account is not active. An activation code has been sent to your email.',
      );
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword)
      throw new UnauthorizedException('invalid credentials');

    return { userId: user.id, role: user.role };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new UnauthorizedException('invalid refresh token');

    // check if refresh token is repetitive
    const isValidRefreshToken = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!isValidRefreshToken)
      throw new UnauthorizedException('invalid refresh token');

    return { userId: user.id, role: user.role };
  }

  async generateTokens(user: CurrentUser) {
    const payload: AuthJwtPayload = { userId: user.userId, role: user.role };

    const optionsRefreshToken: JwtSignOptions = {
      secret: this.configService.getOrThrow('refreshSecret'),
      expiresIn: this.configService.getOrThrow('refreshExpiresIn'),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, optionsRefreshToken),
    ]);

    return { accessToken, refreshToken };
  }
}
