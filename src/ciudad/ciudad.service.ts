import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CiudadDTO } from './ciudad.dto';
import { Ciudad } from './ciudad.entity';

@Injectable()
export class CiudadService {
    private ciudades : Ciudad[] = [];
    
    constructor (@InjectRepository(Ciudad) private readonly ciudadRepository : Repository<Ciudad>) {}
 
    public async getAllRaw() : Promise<Ciudad[]> {
        try {
            let datos = await this.ciudadRepository.query("SELECT * FROM ciudades");
            datos.forEach(element => {
                let ciudad : Ciudad = new Ciudad(element['idCiudad'], element['nombre']);
                this.ciudades.push(ciudad);
            });
            return this.ciudades;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getAll() : Promise<Ciudad[]> {
        try {
            this.ciudades = await this.ciudadRepository.find();
            if (this.ciudades)        
                return this.ciudades;
            else
                throw new Error('No se encuentran ciudades.')
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : number) : Promise<Ciudad[]> {
        try {
            const criterio : FindOneOptions = { relations: [ 'escuelas' ], where: { idCiudad: id } }
            let ciudad : Ciudad = await this.ciudadRepository.findOne( criterio );
            this.ciudades = [];
            if (ciudad) 
                this.ciudades.push(ciudad);
            else
                throw new Error('La ciudad no se encuentra.')
            return this.ciudades;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de ciudad ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async add(datos : CiudadDTO) : Promise<string> {
        try {
            if (datos)
                if (datos.idCiudad && datos.nombre) 
                    if (await this.existeCiudad(datos.idCiudad)) {
                        throw new Error('La ciudad ya se encuentra.')
                    } else {
                        await this.ciudadRepository.save(new Ciudad(datos.idCiudad, datos.nombre));
                    }
                else
                    throw new Error('Los datos para crear ciudad no son validos');
            else
                throw new Error('No hay datos para crear ciudad');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }
    public async delete(id : number) : Promise<string> {
        try {
            if (id)
                if (await this.existeCiudad(id)) {
                    await this.ciudadRepository.delete( id );
                } else
                    throw new Error('La ciudad no se encuentra.')
            else
                throw new Error('No hay datos para eliminar ciudades');
            return "ok";
            } catch (error) {
                return error.message;            
        }
    }
    public async update(id: number, datos : CiudadDTO) : Promise<string> {
        try {
            if (datos)
                if (datos.nombre) 
                    if (await this.existeCiudad(id)) {
                        let criterio : FindOneOptions = { where: { idCiudad: id } }
                        let ciudad : Ciudad = await this.ciudadRepository.findOne( criterio );
                        ciudad.setNombre(datos.nombre); 
                        await this.ciudadRepository.save(ciudad);
                    } else
                        throw new Error('La ciudad no se encuentra.')                    
                else
                    throw new Error('Los datos para modificar ciudad no son validos');
            else
                throw new Error('No hay datos para modificar ciudades');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }
/////
    private async existeCiudad(id : number) : Promise<boolean> {
        let criterio : FindOneOptions = { where: { idCiudad: id } };
        let ciudad : Ciudad = await this.ciudadRepository.findOne( criterio );
        return (ciudad != null);
    }
}
