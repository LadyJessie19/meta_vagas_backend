import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vacancy } from './vacancy.entity';

@Entity('tecnologies')
export class Tecnology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  tecName: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  creatorsName: string;

  @ManyToMany(() => Vacancy, (vacancy) => vacancy.technologies)
  vacancies: Vacancy[];
}
