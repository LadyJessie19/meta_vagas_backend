import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { User } from './user.entity';
import { flatten } from '@nestjs/common';
  
  @Entity('vacancy')
  export class Vacancy {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int', nullable: false })
    wage: number;

    @Column({ nullable: false })
    location: string;

    @Column({ nullable : false})
    vacancyRole : string;

    @Column({ nullable : false})
    vacancyType : string

    @Column({ nullable : false})
    vacancyDescription : string;

    @Column({ nullable : false})
    level : string;

    @Column({ nullable : false})
    companyId : number;

    @ManyToOne(() => User, (user) => user.vacancy)
    @JoinColumn()
    advertiserId: User;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }