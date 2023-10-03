import { ApiProperty } from '@nestjs/swagger';

//This is meant to be used as an example to the documentation

export class CreateSubjectDoc {
  @ApiProperty({
    example: 'Física 1',
  })
  subjectName: string;

  @ApiProperty({
    example: 12000,
  })
  code: number;

  @ApiProperty({
    example: 'Aqui você aprenderá movimento retilíneo uniforme.',
  })
  description: string;

  @ApiProperty({
    example: 10,
  })
  credits: number;

  @ApiProperty({
    example: 'Santa Mônica',
  })
  campus: string;

  @ApiProperty({
    example: 'Sala 101 bloco A',
  })
  classRoom: string;
}