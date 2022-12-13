import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clase/clase.entity';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ Estudiante, Clase ])
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService]
})
export class EstudianteModule {}
