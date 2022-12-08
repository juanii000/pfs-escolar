import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseController } from './clase.controller';
import { Clase } from './clase.entity';
import { ClaseService } from './clase.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ Clase  ])
  ],
  controllers: [ClaseController],
  providers: [ClaseService]
})
export class ClaseModule {}
