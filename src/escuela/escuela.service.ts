import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Escuela } from './escuela.entity';

@Injectable()
export class EscuelaService {
    private escuelas : Escuela[] = [];
    
    constructor (@InjectRepository(Escuela) private readonly escuelaRepository : Repository<Escuela>) {}
 
    public async getAllRaw() : Promise<Escuela[]> {
        try {
            let escuela = await this.escuelaRepository.query("SELECT * FROM escuelas");
            escuela.forEach(element => {
                let escuela : Escuela = new Escuela(element['idEscuela'], element['nombre'], element['domicilio'], element['idCiudad']);
                this.escuelas.push(escuela);
            });
            return this.escuelas;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getAll() : Promise<Escuela[]> {
        try {
            const criterio : FindManyOptions = { relations: [ 'ciudad' ] }
            this.escuelas = await this.escuelaRepository.find( criterio );        
            return this.escuelas;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : number) : Promise<Escuela[]> {
        try {
            const criterio : FindOneOptions = { relations: [ 'ciudad', 'clases' ], where: { idEscuela: id } }
            let escuela : Escuela = await this.escuelaRepository.findOne( criterio );
            this.escuelas = [];
            if (escuela) 
                this.escuelas.push(escuela);
            else
                throw new Error('La escuela no se encuentra.')
            return this.escuelas;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de escuela ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async add(datos : any) : Promise<string> {
        try {
            if (datos)
                if (datos.idEscuela && datos.nombre && datos.domicilio && datos.ciudad) 
                    if (await this.existeEscuela(datos.idEscuela)) {
                        throw new Error('La escuela ya se encuentra.')
                    } else {
                        await this.escuelaRepository.save(new Escuela(datos.idEscuela, datos.nombre, datos.domicilio, datos.ciudad));
                    }
                else
                    throw new Error('Los datos para crear escuela no son validos');
            else
                throw new Error('No hay datos para crear escuela');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }
    public async delete(id : number) : Promise<string> {
        try {
            if (id)
                if (await this.existeEscuela(id)) {
                    await this.escuelaRepository.delete( id );
                } else
                    throw new Error('La escuela no se encuentra.')
            else
                throw new Error('No hay datos para eliminar escuelas');
            return "ok";
            } catch (error) {
                return error.message;            
        }
    }
    public async update(id : number, datos : any) : Promise<string> {
        try {
            if (datos)
                if (datos.idEscuela && datos.nombre && datos.domicilio && datos.ciudad) 
                    if (await this.existeEscuela(id)) {
                        let criterio : FindOneOptions = { where: { idEscuela: id } }
                        let escuela : Escuela = await this.escuelaRepository.findOne( criterio );
                        escuela.setNombre(datos.nombre);
                        escuela.setDomicilio(datos.domicilio);
                        escuela.setCiudad(datos.ciudad);
                        await this.escuelaRepository.save(escuela);
                    } else
                        throw new Error('La escuela no se encuentra.')                    
                else
                    throw new Error('Los datos para modificar escuela no son validos');
            else
                throw new Error('No hay datos para modificar escuelas');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }
/////
    private async existeEscuela(id : number) : Promise<boolean> {
        let criterio : FindOneOptions = { where: { idEscuela: id } };
        let escuela : Escuela = await this.escuelaRepository.findOne( criterio );
        return (escuela != null);
    }
}
