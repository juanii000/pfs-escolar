import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClaseDTO } from './clase.dto';
import { Clase } from './clase.entity';
import { ClaseService } from './clase.service';

@Controller('clase')
export class ClaseController {
    constructor(private claseService : ClaseService) {}

    @Get('/raw')
    private listarRaw() : Clase[] | any {
        return this.claseService.getAllRaw();
    }
    @Get(':id/estudiantes')
    private listarUnaCompleta(@Param('id') id : number) : Clase[] | any {
        return this.claseService.getByIdCompleto(id);
    }    
    @Get(':id')
    private listarUna(@Param('id') id : number) : Clase[] | any {
        return this.claseService.getById(id);
    }    
    @Get()
    private listarTodas() : Clase[] | any {
        return this.claseService.getAll();
    }
    @Post()    
    private agregar(@Body() datos : ClaseDTO) : Clase[] | any {
        return this.claseService.add(datos);
    }
    @Delete(':id')
    private eliminar(@Param('id') id : number) : Clase[] | any {
        return this.claseService.delete(id);        
    }
    @Put(':id')
    private actualizar(@Param('id') id : number, @Body() datos : ClaseDTO) : Clase[] | any {
        return this.claseService.update(id, datos)
    }
}
