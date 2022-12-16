import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from 'src/clase/clase.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Injectable()
export class EstudianteService {
    private estudiantes : Estudiante[] = [];
    
    constructor (@InjectRepository(Estudiante) private readonly estudianteRepository : Repository<Estudiante>,
                 @InjectRepository(Clase) private readonly claseRepository : Repository<Clase>) {}
 
    public async getAllRaw() : Promise<Estudiante[]> {
        try {
            let estudiante = await this.estudianteRepository.query("SELECT * FROM estudiantes");
            estudiante.forEach(element => {
                let estudiante : Estudiante = new Estudiante(element['idEstudiante'], element['apellidoNombres'], element['fechaNacimiento']);
                this.estudiantes.push(estudiante);
            });
            return this.estudiantes;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getAll() : Promise<Estudiante[]> {
        try {
            this.estudiantes = await this.estudianteRepository.find();        
            return this.estudiantes;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : number) : Promise<Estudiante[]> {
        try {
            const criterio : FindOneOptions = { where: { idEstudiante: id } }
            let estudiante : Estudiante = await this.estudianteRepository.findOne( criterio );
            this.estudiantes = [];
            if (estudiante) 
                this.estudiantes.push(estudiante);
            else
                throw new Error('La estudiante no se encuentra.')
            return this.estudiantes;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de estudiante ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getByIdCompleto(id : number) : Promise<Estudiante[]> {
        try {
            this.estudiantes = [];
            const criterio : FindOneOptions = { relations: [ 'clases' ], where: { idEstudiante: id } }
            let estudiante : Estudiante = await this.estudianteRepository.findOne( criterio );
            if (estudiante) 
                this.estudiantes.push(estudiante);
            else
                throw new Error('La estudiante no se encuentra.')
            return this.estudiantes;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de estudiante ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async add(datos : any) : Promise<string> {
        try {
            if (datos)
                if (datos.idEstudiante && datos.apellidoNombres && datos.fechaNacimiento) 
                    if (await this.existeEstudiante(datos.idEstudiante)) {
                        throw new Error('La estudiante ya se encuentra.')
                    } else {
                        await this.estudianteRepository.save(new Estudiante(datos.idEstudiante, datos.apellidoNombres, datos.fechaNacimiento));
                    }
                else
                    throw new Error('Los datos para crear estudiante no son validos');
            else
                throw new Error('No hay datos para crear estudiante');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }
    public async delete(id : number) : Promise<string> {
        try {
            if (id)
                if (await this.existeEstudiante(id)) {
                    await this.estudianteRepository.delete( id );
                } else
                    throw new Error('La estudiante no se encuentra.')
            else
                throw new Error('No hay datos para eliminar estudiantes');
            return "ok";
            } catch (error) {
                return error.message;            
        }
    }
    public async update(id : number, datos : any) : Promise<string> {
        try {
            if (datos)
                if (datos.idEstudiante && datos.apellidoNombres && datos.fechaNacimiento) 
                    if (await this.existeEstudiante(id)) {
                        let criterio : FindOneOptions = { where: { idEstudiante: id } }
                        let estudiante : Estudiante = await this.estudianteRepository.findOne( criterio );
                        estudiante.setApellidoNombres(datos.apellidoNombres);
                        estudiante.setFechaNacimiento(datos.fechaNacimiento);
                        await this.estudianteRepository.save(estudiante);
                    } else
                        throw new Error('La estudiante no se encuentra.')                    
                else
                    throw new Error('Los datos para modificar estudiante no son validos');
            else
                throw new Error('No hay datos para modificar estudiantes');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }
/////
    private async existeEstudiante(id : number) : Promise<boolean> {
        let criterio : FindOneOptions = { where: { idEstudiante: id } };
        let estudiante : Estudiante = await this.estudianteRepository.findOne( criterio );
        return (estudiante != null);
    }
}
