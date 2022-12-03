import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Estudiante } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
export class EstudianteController {
    constructor(private escuelaService : EstudianteService) {}

    @Get('/raw')
    private listarRaw() : Estudiante[] | any {
        return this.escuelaService.getAllRaw();
    }
    @Get(':id')
    private listarUna(@Param('id') id : number) : Estudiante[] | any {
        return this.escuelaService.getById(id);
    }    
    @Get()
    private listarTodas() : Estudiante[] | any {
        return this.escuelaService.getAll();
    }
    @Post()    
    private agregar(@Body() datos : any) : Estudiante[] | any {
        return this.escuelaService.add(datos);
    }
    @Delete(':id')
    private eliminar(@Param('id') id : number) : Estudiante[] | any {
        return this.escuelaService.delete(id);        
    }
    @Put()
    private actualizar(@Body() datos : any) : Estudiante[] | any {
        return this.escuelaService.update(datos)
    }
}
