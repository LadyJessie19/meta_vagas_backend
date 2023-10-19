import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { Vacancy } from './vacancy.entity';
import { RoleEnum } from '../../enums/user-roles.enum';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'character varying', nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: true,
    select: true,
  })
  password: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    nullable: false,
    default: RoleEnum.CANDIDATE,
    enum: RoleEnum,
  })
  role: RoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.advertiserId)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  vacancies: Vacancy[];

  @BeforeInsert()
  @BeforeUpdate()
  public async passwordHash() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException('Error on password hash.');
    }
  }
}
