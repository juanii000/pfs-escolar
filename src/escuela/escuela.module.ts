import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscuelaController } from './escuela.controller';
import { Escuela } from './escuela.entity';
import { EscuelaService } from './escuela.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ Escuela  ])
  ],
  controllers: [EscuelaController],
  providers: [EscuelaService]
})
export class EscuelaModule {}
