import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Profesor } from './profesor.entity';

@Injectable()
export class ProfesorService {
    private profesores : Profesor[] = [];
    
    constructor (@InjectRepository(Profesor)
    private readonly profesorRepository : Repository<Profesor>) {}
    
    public async getAllRaw() : Promise<Profesor[]> {
        try {
            let profesor = await this.profesorRepository.query("SELECT * FROM profesores");
            profesor.forEach(element => {
                let profesor : Profesor = new Profesor(element['idProfesor'], element['apellidoNombres']);
                this.profesores.push(profesor);
            });
            return this.profesores;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getAll() : Promise<Profesor[]> {
        try {
            this.profesores = await this.profesorRepository.find();        
            return this.profesores;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : number) : Promise<Profesor[]> {
        try {
            const criterio : FindOneOptions = { where: { idProfesor: id } }
            let profesor : Profesor = await this.profesorRepository.findOne( criterio );
            this.profesores = [];
            if (profesor) 
                this.profesores.push(profesor);
            else
                throw new Error('La profesor no se encuentra.')
            return this.profesores;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de profesor ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async add(datos : any) : Promise<string> {
        try {
            if (datos)
                if (datos.idProfesor && datos.apellidoNombres) 
                    if (await this.existeProfesor(datos.idProfesor)) {
                        throw new Error('La profesor ya se encuentra.')
                    } else {
                        await this.profesorRepository.save(new Profesor(datos.idProfesor, datos.apellidoNombres));
                    }
                else
                    throw new Error('Los datos para crear profesor no son validos');
            else
                throw new Error('No hay datos para crear profesor');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }
    public async delete(id : number) : Promise<string> {
        try {
            if (id)
                if (await this.existeProfesor(id)) {
                    await this.profesorRepository.delete( id );
                } else
                    throw new Error('La profesor no se encuentra.')
            else
                throw new Error('No hay datos para eliminar profesores');
            return "ok";
            } catch (error) {
                return error.message;            
        }
    }
    public async update(datos : any) : Promise<string> {
        try {
            if (datos)
                if (datos.idProfesor && datos.apellidoNombres) 
                    if (await this.existeProfesor(datos.idProfesor)) {
                        let criterio : FindOneOptions = { where: { idProfesor: datos.idProfesor } }
                        let profesor : Profesor = await this.profesorRepository.findOne( criterio );
                        profesor.setApellidoNombres(datos.apellidoNombres); 
                        await this.profesorRepository.save(profesor);
                    } else
                        throw new Error('La profesor no se encuentra.')                    
                else
                    throw new Error('Los datos para modificar profesor no son validos');
            else
                throw new Error('No hay datos para modificar profesores');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }
/////
    private async existeProfesor(id : number) : Promise<boolean> {
        let criterio : FindOneOptions = { where: { idProfesor: id } };
        let profesor : Profesor = await this.profesorRepository.findOne( criterio );
        return (profesor != null);
    }
}