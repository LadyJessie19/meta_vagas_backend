import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  JoinColumn
  } from 'typeorm';
import { User } from './user.entity';
import { Tecnology } from './tecnology.entity';
import { Company } from './company.entity';

@Entity('vacancies')
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  vacancyRole: string;

  @Column({ type: 'int', nullable: false })
  wage: number;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  vacancyType: string;

  @Column({ nullable: false })
  vacancyDescription: string;

  @Column({ nullable: false })
  level: string;

  @ManyToOne(() => Company, (company) => company.vacancies)
  companyId: Company;

  @ManyToOne(() => User, (user) => user.vacancies)
  advertiserId: User;

  @ManyToMany(() => Tecnology, (technology) => technology.vacancies)
  @JoinTable()
  technologies: Tecnology[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
