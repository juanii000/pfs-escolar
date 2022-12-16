import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Estudiante } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
export class EstudianteController {
    constructor(private estudianteService : EstudianteService) {}

    @Get('/raw')
    private listarRaw() : Estudiante[] | any {
        return this.estudianteService.getAllRaw();
    }
    @Get(':id/clases')
    private listarUnaCompleta(@Param('id') id : number) : Estudiante[] | any {
        return this.estudianteService.getByIdCompleto(id);
    }    
    @Get(':id')
    private listarUna(@Param('id') id : number) : Estudiante[] | any {
        return this.estudianteService.getById(id);
    }    
    @Get()
    private listarTodas() : Estudiante[] | any {
        return this.estudianteService.getAll();
    }
    @Post()    
    private agregar(@Body() datos : any) : Estudiante[] | any {
        return this.estudianteService.add(datos);
    }
    @Delete(':id')
    private eliminar(@Param('id') id : number) : Estudiante[] | any {
        return this.estudianteService.delete(id);        
    }
    @Put(':id')
    private actualizar(@Param('id') id : number, @Body() datos : any) : Estudiante[] | any {
        return this.estudianteService.update(id, datos)
    }
}
