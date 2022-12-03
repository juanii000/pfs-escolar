import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Profesor } from './profesor.entity';
import { ProfesorService } from './profesor.service';

@Controller('profesor')
export class ProfesorController {
    constructor(private profesorService : ProfesorService) {}

    @Get('/raw')
    private listarRaw() : Profesor[] | any {
        return this.profesorService.getAllRaw();
    }
    @Get(':id')
    private listarUna(@Param('id') id : number) : Profesor[] | any {
        return this.profesorService.getById(id);
    }    
    @Get()
    private listarTodas() : Profesor[] | any {
        return this.profesorService.getAll();
    }
    @Post()    
    private agregar(@Body() datos : any) : Profesor[] | any {
        return this.profesorService.add(datos);
    }
    @Delete(':id')
    private eliminar(@Param('id') id : number) : Profesor[] | any {
        return this.profesorService.delete(id);        
    }
    @Put()
    private actualizar(@Body() datos : any) : Profesor[] | any {
        return this.profesorService.update(datos)
    }
}
