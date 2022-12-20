import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clase/clase.entity';
import { Estudiante } from 'src/estudiante/estudiante.entity';
import { AsistenciaController } from './asistencia.controller';
import { Asistencia } from './asistencia.entity';
import { AsistenciaService } from './asistencia.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ Asistencia, Clase, Estudiante ])
  ],
  controllers: [AsistenciaController],
  providers: [AsistenciaService]
})
export class AsistenciaModule {}
