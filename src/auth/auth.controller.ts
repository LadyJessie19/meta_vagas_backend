import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}
    
    @Post("register")
    register(@Body() user : CreateUserDto){
        return this.authService.register(user);
    }

    @Post("login")
    login(@Body() auth : LoginAuthDto){
        return this.authService.login(auth);
    }
}
