import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
