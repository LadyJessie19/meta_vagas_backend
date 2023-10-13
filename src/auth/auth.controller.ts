import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDoc } from '../docs/user/create-user.doc';
import { UserEntityDoc } from '../docs/user/user-entity.doc';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: CreateUserDoc,
  })
  @ApiResponse({
    type: UserEntityDoc,
  })
  @Post()
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() auth: LoginAuthDto) {
    return this.authService.login(auth);
  }
}
