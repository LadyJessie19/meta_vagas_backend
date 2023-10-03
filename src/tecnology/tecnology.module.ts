import { Module } from '@nestjs/common';
import { TecnologyService } from './tecnology.service';
import { TecnologyController } from './tecnology.controller';

@Module({
  controllers: [TecnologyController],
  providers: [TecnologyService],
})
export class TecnologyModule {}
