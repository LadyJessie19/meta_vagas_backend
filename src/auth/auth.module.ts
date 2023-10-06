import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn : "24h"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule{}