import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Escuela } from './escuela.entity';
import { EscuelaService } from './escuela.service';

@Controller('escuela')
export class EscuelaController {
    constructor(private escuelaService : EscuelaService) {}

    @Get('/raw')
    private listarRaw() : Escuela[] | any {
        return this.escuelaService.getAllRaw();
    }
    @Get(':id')
    private listarUna(@Param('id') id : number) : Escuela[] | any {
        return this.escuelaService.getById(id);
    }    
    @Get()
    private listarTodas() : Escuela[] | any {
        return this.escuelaService.getAll();
    }
    @Post()    
    private agregar(@Body() datos : any) : Escuela[] | any {
        return this.escuelaService.add(datos);
    }
    @Delete(':id')
    private eliminar(@Param('id') id : number) : Escuela[] | any {
        return this.escuelaService.delete(id);        
    }
    @Put()
    private actualizar(@Body() datos : any) : Escuela[] | any {
        return this.escuelaService.update(datos)
    }
}