import { ApiProperty } from '@nestjs/swagger';
import { CreateTecnologyDoc } from './create-tecnology.doc';

export class TecnologyEntityDoc extends CreateTecnologyDoc {
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