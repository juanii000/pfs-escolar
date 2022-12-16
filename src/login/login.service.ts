import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { LoginDTO } from './login.dto';
import { Login } from './login.entity';

@Injectable()
export class LoginService {
    private usuarios : Login[] = [];
    
    constructor (@InjectRepository(Login) private readonly loginRepository : Repository<Login>) {}
    
    public async getAll() : Promise<Login[]> {
        try {
            this.usuarios = await this.loginRepository.find();
            if (this.usuarios)        
                return this.usuarios;
            else
                throw new Error('No se encuentran usuarios.')
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id : string) : Promise<Login[]> {
        try {
            const criterio : FindOneOptions = { where: { usuario: id } }
            let login : Login = await this.loginRepository.findOne( criterio );
            this.usuarios = [];
            if (login) 
                this.usuarios.push(login);
            else
                throw new Error('El usuario no se encuentra.')
            return this.usuarios;
        } catch (error) {
            throw new HttpException( {
                status : HttpStatus.NOT_FOUND, error : 'Error en la busqueda de login ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async validar(datos : LoginDTO) : Promise<string> {
        try {
            if (datos) {
                if (datos.usuario && datos.palabra) {
                    let criterio : FindOneOptions = { where: { usuario: datos.usuario } };
                    let login : Login = await this.loginRepository.findOne( criterio );
                    if (login) {
                        if (login.getPalabra() == datos.palabra)
                            return "ok";
                        else
                            return "La contraseña no es valida";
                    } else {
                        await this.loginRepository.save(new Login(datos.usuario, datos.palabra));                        
                    }
                } else
                    throw new Error('Los datos para crear usuario no son validos');
            } else
                throw new Error('No hay datos para crear usuario');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }
}
