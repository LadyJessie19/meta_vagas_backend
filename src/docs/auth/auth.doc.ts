import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDoc {
  @ApiProperty({
    example: 'caio@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '12345678',
  })
  password: string;
}