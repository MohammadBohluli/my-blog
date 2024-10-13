import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { email, username, name, password } = createUserDto;
    return this.prisma.users.create({
      data: { email, username, password, name },
    });
  }

  findByUsername(username: string) {
    return this.prisma.users.findUnique({ where: { username } });
  }

  findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }
}
