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

  @Column({ type: 'date', nullable: false })
  foundedAt: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  // @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
  // vacancies: Vacancy[];

  //At Vacancy i must add this:
  //@ManyToOne(() => Company, (company) => company.vacancies)
  //company: Company;
}
