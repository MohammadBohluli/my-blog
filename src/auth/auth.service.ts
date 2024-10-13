import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

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
}
