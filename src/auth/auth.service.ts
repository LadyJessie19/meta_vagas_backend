import { BadRequestException, Injectable } from '@nestjs/common';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    try {
      if (await this.userService.findUserByEmail(user.email)) {
        throw new BadRequestException(
          'An user with this email already exists.',
        );
      }

      return await this.userService.create(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.userService.findUserByEmail(loginAuthDto.email);

      if (!user) {
        throw new NotFoundException("This user wasn't found at the database");
      }

      if (!(await bcrypt.compare(loginAuthDto.password, user.password))) {
        throw new UnauthorizedException('Wrong credentials.');
      }

      const payload = { sub: user.id, email: user.email, role: user.role };

      const token = await this.jwtService.signAsync(payload);

      return { access_token: token };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
