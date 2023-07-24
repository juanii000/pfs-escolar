import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EscuelaModule } from './escuela/escuela.module';
import { ClaseModule } from './clase/clase.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app') }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bpsnut2qo4tqnnszetjg-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uaudqcs09phcq9by',
      password: 'Abv1zRDLwSNTdS0dwD9P',
      database: 'bpsnut2qo4tqnnszetjg',
      entities: [        
        "dist/**/**.entity{.ts,.js}"
      ],
      synchronize: false,
    }),
    CiudadModule,
    EstudianteModule,
    ProfesorModule,
    EscuelaModule,
    ClaseModule,
    AsistenciaModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
