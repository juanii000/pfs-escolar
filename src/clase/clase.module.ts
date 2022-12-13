import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/estudiante.entity';
import { ClaseController } from './clase.controller';
import { Clase } from './clase.entity';
import { ClaseService } from './clase.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ Clase, Estudiante ])
  ],
  controllers: [ClaseController],
  providers: [ClaseService]
})
export class ClaseModule {}
