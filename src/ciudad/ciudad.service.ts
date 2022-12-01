import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from './ciudad.entity';

@Injectable()
export class CiudadService {
    private ciudades : Ciudad[] = [];
    
    constructor (@InjectRepository(Ciudad)
    private readonly ciudadRepository : Repository<Ciudad>) {}
 
    public async getAllRaw() : Promise<Ciudad[]> {
        try {
            let ciudad = await this.ciudadRepository.query("SELECT * FROM ciudades");
            ciudad.forEach(element => {
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
            return this.ciudades;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : number) : Promise<Ciudad[]> {
        try {
            const criterio : FindOneOptions = { where: { idCiudad: id } }
            this.ciudades.push(await this.ciudadRepository.findOne( criterio ));
            return this.ciudades;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async add(datos : any) : Promise<string> {
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
                if (await this.existeCiudad(id)) 
                    await this.ciudadRepository.delete(id);
                else
                    throw new Error('La ciudad no se encuentra.')
            else
                throw new Error('No hay datos para eliminar ciudades');
            return "ok";
            } catch (error) {
                return error.message;            
        }
    }
    public async update(datos : any) : Promise<string> {
        try {
            if (datos)
                if (datos.idCiudad && datos.nombre) 
                    if (await this.existeCiudad(datos.idCiudad)) 
                        await this.ciudadRepository.save(new Ciudad(datos.idCiudad, datos.nombre));
                    else
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
        const criterio : FindOneOptions = { where: { idCiudad: id } }
        let ciudad : Ciudad = await this.ciudadRepository.findOne( criterio );
        return (ciudad != null);
    }
}
