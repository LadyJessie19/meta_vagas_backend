import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from "../../enums/user-roles.enum";

export class CreateUserDoc {
  @ApiProperty({
    example: 'Caio Henrique',
  })
  name: string;

  @ApiProperty({
    example: 'caio@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;

  @ApiProperty({
    example: 'ADMIN',
  })
  role?: RoleEnum;

  @ApiProperty({
    example: true,
  })
  isActive?: boolean;
}