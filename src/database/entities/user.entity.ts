import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { Vacancy } from './vacancy.entity';
import { RoleEnum } from '';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'character varying', nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'character varying', nullable: false, select: false })
  password: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    nullable: false,
    default: RoleEnum.candidate,
    enum: RoleEnum,
  })
  role: RoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.user)
  vacancy: Vacancy[];

  @BeforeInsert()
  @BeforeUpdate()
  public async passwordHash(password: string) {
    try {
      if (password || this.password) {
        this.password = await bcrypt.hash(password || this.password, 10);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error on password hash.');
    }
  }
}