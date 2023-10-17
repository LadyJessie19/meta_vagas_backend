import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common';
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

  async login(loginAuth: LoginAuthDto) {
    try {
      const userFound = await this.userService.findUserByEmail(loginAuth.email);

      if (
        !userFound ||
        !(await bcrypt.compare(loginAuth.password, userFound.password))
      ) {
        throw new UnauthorizedException(
          'This user wasnt found at the database',
        );
      }

      const tokenPayload = {
        user: userFound.id,
        email: userFound.email,
        role: userFound.role,
        isActive: userFound.isActive,
      };

      return {
        data: { email: userFound.email, isActive: userFound.isActive },
        token: await this.jwtService.signAsync(tokenPayload),
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
