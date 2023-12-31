import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vacancy } from './vacancy.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  foundedAt: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.companyId)
  vacancies: Vacancy[];
}
