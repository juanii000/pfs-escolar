import { Controller, Get, Param } from '@nestjs/common';
import { Ciudad } from './ciudad.entity';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
export class CiudadController {
    constructor(private ciudadService : CiudadService) {}

    @Get('/raw')
    private listarRaw() : Ciudad[] | any {
        return this.ciudadService.getAllRaw();
    }
    @Get(':id')
    private listarUna(@Param('id') id : number) : Ciudad | any {
        return this.ciudadService.getById(id);
    }    
    @Get()
    private listarTodas() : Ciudad[] | any {
        return this.ciudadService.getAll();
    }    
}
