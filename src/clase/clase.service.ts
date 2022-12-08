import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { ClaseDTO } from './clase.dto';
import { Clase } from './clase.entity';

@Injectable()
export class ClaseService {
    private clases : Clase[] = [];
    
    constructor (@InjectRepository(Clase)
    private readonly claseRepository : Repository<Clase>) {}
 
    public async getAllRaw() : Promise<Clase[]> {
        try {
            let clase = await this.claseRepository.query("SELECT * FROM clases");
            clase.forEach(element => {
                let clase : Clase = new Clase(element['nombre'], element['idEscuela'], element['idProfesor']);
                this.clases.push(clase);
            });
            return this.clases;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getAll() : Promise<Clase[]> {
        try {
            this.clases = await this.claseRepository.find();        
            return this.clases;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : number) : Promise<Clase[]> {
        try {
            const criterio : FindOneOptions = { where: { idClase: id } }
            let clase : Clase = await this.claseRepository.findOne( criterio );
            this.clases = [];
            if (clase) 
                this.clases.push(clase);
            else
                throw new Error('La clase no se encuentra.')
            return this.clases;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de clase ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async add(datos : ClaseDTO) : Promise<string> {
        try {
            if (datos)
                if (datos.nombre && datos.idEscuela && datos.idProfesor) 
                    await this.claseRepository.save(new Clase(datos.nombre, datos.idEscuela, datos.idProfesor));
                else
                    throw new Error('Los datos para crear clase no son validos');
            else
                throw new Error('No hay datos para crear clase');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }
    public async delete(id : number) : Promise<string> {
        try {
            if (id)
                if (await this.existeClase(id)) {
                    await this.claseRepository.delete( id );
                } else
                    throw new Error('La clase no se encuentra.')
            else
                throw new Error('No hay datos para eliminar clases');
            return "ok";
            } catch (error) {
                return error.message;            
        }
    }
    public async update(id: number, datos : ClaseDTO) : Promise<string> {
        try {
            if (datos)
                if (id && datos.nombre && datos.idEscuela && datos.idProfesor) 
                    if (await this.existeClase(id)) {
                        let criterio : FindOneOptions = { where: { idClase: id } }
                        let clase : Clase = await this.claseRepository.findOne( criterio );
                        clase.setNombre(datos.nombre); 
                        clase.setIdEscuela(datos.idEscuela); 
                        clase.setIdProfesor(datos.idProfesor); 
                        await this.claseRepository.save(clase);
                    } else
                        throw new Error('La clase no se encuentra.')                    
                else
                    throw new Error('Los datos para modificar clase no son validos');
            else
                throw new Error('No hay datos para modificar clases');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }
/////
    private async existeClase(id : number) : Promise<boolean> {
        let criterio : FindOneOptions = { where: { idClase: id } };
        let clase : Clase = await this.claseRepository.findOne( criterio );
        return (clase != null);
    }
}
