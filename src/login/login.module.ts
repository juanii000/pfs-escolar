import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { Login } from './login.entity';
import { LoginService } from './login.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ Login ])
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
