import { ApiProperty } from '@nestjs/swagger';

export class CreateTecnologyDoc {
  @ApiProperty({
    example: 'Git',
  })
  tecName: string;

  @ApiProperty({
    example: 'Linus Torvalds',
  })
  creatorsName: string;

}