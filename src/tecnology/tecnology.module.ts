import { Module } from '@nestjs/common';
import { TecnologyService } from './tecnology.service';
import { TecnologyController } from './tecnology.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tecnology } from 'src/database/entities/tecnology.entity';
import { TecnologyRepository } from './tecnology.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tecnology])],
  controllers: [TecnologyController],
  providers: [TecnologyService, TecnologyRepository],
})
export class TecnologyModule {}
