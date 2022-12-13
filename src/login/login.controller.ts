import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LoginDTO } from './login.dto';
import { Login } from './login.entity';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {

    constructor(private loginService : LoginService) {}

    @Get(':id')
    private listarUna(@Param('id') id : string) : Login[] | any {
        return this.loginService.getById(id);
    }    
    @Get()
    private listarTodas() : Login[] | any {
        return this.loginService.getAll();
    }
    @Post()    
    private validar(@Body() datos : LoginDTO) : Login[] | any {
        return this.loginService.validar(datos);
    }
    @Delete(':id')
    private eliminar(@Param('id') id : string) : Login[] | any {
        return this.loginService.delete(id);        
    }
    @Put(':id')
    private actualizar(@Param('id') id : string, @Body() datos : LoginDTO) : Login[] | any {
        return this.loginService.update(datos)
    }
}
