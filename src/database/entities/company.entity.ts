import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vacancy } from './vacancy.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: true, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  foundedAt: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  // @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
  // vacancies: Vacancy[];

  //At Vacancy i must add this:
  //@ManyToOne(() => Company, (company) => company.vacancies)
  //company: Company;
}
