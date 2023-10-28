import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../database/entities/company.entity';
import { Tecnology } from '../../database/entities/tecnology.entity';

export class CreateVacancyDoc {
  @ApiProperty({
    example: 'Desenvolvedor full sctack',
  })
  vacancyRole: string;

  @ApiProperty({
    example: 3000,
  })
  wage: number;

  @ApiProperty({
    example: 'São Paulo',
  })
  location: string;

  @ApiProperty({
    example: 'remoto',
  })
  vacancyType: string;

  @ApiProperty({
    example: 'Venha fazer parte da nossa empresa!',
  })
  vacancyDescription: string;

  @ApiProperty({
    example: 'pleno',
  })
  level: string;

  @ApiProperty({
    example: 1,
  })
  companyId: Company;

  @ApiProperty({
    example: 1,
  })
  technologies: Tecnology[];
}
