import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDoc } from './create-user.doc';

export class UserEntityDoc extends CreateUserDoc {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '2023-09-18T22:00:36.880Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-09-18T22:00:36.880Z',
  })
  updatedAt: Date;
}