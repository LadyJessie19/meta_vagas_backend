import { Injectable } from '@nestjs/common';
import {
    HttpException,
    HttpStatus,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    register(user: CreateUserDto) {
        return this.userService.create(user)
    }

    async login(loginAuthDto: LoginAuthDto) {
        try {
            const user = await this.userService.findUserByEmail(loginAuthDto.email);

            if (!user) {
                throw new NotFoundException;
            }

            else if (user.password === loginAuthDto.password) {
                throw new UnauthorizedException;
            }

            const payload = { sub: user.id, email: user.email, role: user.role };
            
            const token = await this.jwtService.signAsync(payload);

            return { access_token: token }
        }
        catch (error) {
            console.log(error)
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
