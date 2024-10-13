import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username, name, password } = createUserDto;

    const hashPassword = await argon2.hash(password);

    const user = await this.prisma.users.create({
      data: { email, username, password: hashPassword, name },
    });

    return user;
  }

  findByUsername(username: string) {
    return this.prisma.users.findUnique({ where: { username } });
  }

  findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }
}
