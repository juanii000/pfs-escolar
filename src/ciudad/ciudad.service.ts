import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from './ciudad.entity';

@Injectable()
export class CiudadService {
    constructor (@InjectRepository(Ciudad)
    private readonly ciudadRepository : Repository<Ciudad>) {}
 
    public async getAllRaw() : Promise<Ciudad[]> {
        try {
            let datos = await this.ciudadRepository.query("SELECT * FROM ciudades");
            let ciudades : Ciudad[] = [];
            datos.forEach(element => {
                let ciudad : Ciudad = new Ciudad(element['idCiudad'], element['nombre']);
                ciudades.push(ciudad);
            });
            return await ciudades;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getAll() : Promise<Ciudad[]> {
        try {
            let ciudades : Ciudad[] = await this.ciudadRepository.find();        
            return ciudades;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : number) : Promise<Ciudad> {
        try {
            const criterio : FindOneOptions = { where: { idCiudad: id } }
            let ciudad : Ciudad = await this.ciudadRepository.findOne( criterio );        
            return await ciudad;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
}
