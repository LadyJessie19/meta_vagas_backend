import { Module } from '@nestjs/common';
import { TecnologyService } from './tecnology.service';
import { TecnologyController } from './tecnology.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tecnology } from 'src/database/entities/tecnology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tecnology])],
  controllers: [TecnologyController],
  providers: [TecnologyService],
  exports : [TecnologyService],
})
export class TecnologyModule {}
