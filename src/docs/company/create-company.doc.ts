import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDoc {
  @ApiProperty({
    example: 'Arnia',
  })
  name: string;

  @ApiProperty({
    example: 'Belo Horizonte',
  })
  city: string;

  @ApiProperty({
    example: 'Minas Gerais',
  })
  state: string;

  @ApiProperty({
    example: 'Rua Barbacena de oliveira',
  })
  adress: string;

  @ApiProperty({
    example: 'São Paulo',
  })
  foundedAt: string;

  @ApiProperty({
    example: 'Arnia os melhores em tecnologia',
  })
  description: string;
}
