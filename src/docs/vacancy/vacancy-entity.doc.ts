import { ApiProperty } from '@nestjs/swagger';
import { CreateVacancyDoc } from './create-vacancy.doc';

export class VacancyEntityDoc extends CreateVacancyDoc {
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