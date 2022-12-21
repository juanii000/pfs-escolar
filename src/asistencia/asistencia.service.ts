import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AsistenciaDTO } from './asistencia.dto';
import { Asistencia } from './asistencia.entity';

@Injectable()
export class AsistenciaService {
    private asistencias : Asistencia[] = [];
    
    constructor (@InjectRepository(Asistencia) private readonly asistenciaRepository : Repository<Asistencia>) {}
    
    public async getAllRaw() : Promise<Asistencia[]> {
        try {
            let datos = await this.asistenciaRepository.query("SELECT * FROM asistencias");
            datos.forEach(element => {
                let asistencia : Asistencia = new Asistencia(element['claseIdClase'], element['estudianteIdEstudiante'], element['fecha']);
                this.asistencias.push(asistencia);
            });
            return this.asistencias;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getAll() : Promise<Asistencia[]> {
        try {
            this.asistencias = await this.asistenciaRepository.find({ relations: [ 'clase', 'estudiante' ] });
            if (this.asistencias)        
                return this.asistencias;
            else
                throw new Error('No se encuentran asistencias.')
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : number) : Promise<Asistencia[]> {
        try {
            const criterio : FindOneOptions = { relations: [ 'clase', 'estudiante' ], where: { idAsistencia: id } }
            let asistencia : Asistencia = await this.asistenciaRepository.findOne( criterio );
            this.asistencias = [];
            if (asistencia) 
                this.asistencias.push(asistencia);
            else
                throw new Error('La asistencia no se encuentra.')
            return this.asistencias;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de asistencia ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getByClaseEstudiante(idC : number, idE : number) : Promise<Asistencia[]> {
        try {
            const criterio : FindManyOptions = { relations: [ 'clase', 'estudiante' ] }
            let datos : Asistencia[] = await this.asistenciaRepository.find( criterio );
            if (datos) {
                this.asistencias=[];
                for (let i = 0; i < datos.length; i++) {
                    let dato = datos[i];
                    if (dato.clase.getIdClase() == idC && dato.estudiante.getIdEstudiante() == idE)
                        this.asistencias.push(dato);
                }
                return this.asistencias;
            } 
            else
                throw new Error('La asistencia no se encuentra.')
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de asistencia ' + idC + ' - '  + idE + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async add(datos : AsistenciaDTO) : Promise<string> {
        try {
            if (datos){
                if (datos.clase && datos.estudiante && datos.fecha) {
                    await this.asistenciaRepository.save(new Asistencia(datos.clase, datos.estudiante, datos.fecha));
                } else {
                    throw new Error('Los datos para crear asistencia no son validos');
                }
            } else
                throw new Error('No hay datos para crear asistencia');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }
    public async delete(ids : string) : Promise<string> {
        try {
            if (ids) {
                let id = ids.split('.');
                const criterio : FindManyOptions = { relations: [ 'clase', 'estudiante' ] }
                let datos : Asistencia[] = await this.asistenciaRepository.find( criterio );
                for (let i = 0; i < datos.length; i++) {
                    let dato = datos[i];
                    if (dato.clase.getIdClase() == parseInt(id[0]) && 
                        dato.estudiante.getIdEstudiante() == parseInt(id[1]) && 
                        dato.getFecha() == id[2]) {
                        await this.asistenciaRepository.delete( dato.getIdAsistencia() );
                        return "ok";
                    }
                }
                throw new Error('La asistencia no se encuentra.')
            } else {
                throw new Error('No hay datos para eliminar asistencias');
            }
        } catch (error) {
            return error.message;            
        }
    }
/////
    private async existeAsistencia(id : number) : Promise<boolean> {
        let criterio : FindOneOptions = { where: { idAsistencia: id } };
        let asistencia : Asistencia = await this.asistenciaRepository.findOne( criterio );
        return (asistencia != null);
    }
}