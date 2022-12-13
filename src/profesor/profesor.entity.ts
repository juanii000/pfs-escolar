import { Clase } from "src/clase/clase.entity";
import { Entity, PrimaryColumn, Column, JoinColumn, OneToMany } from "typeorm";

@Entity('profesores')
export class Profesor {
    @PrimaryColumn()
    private idProfesor : number;
    @Column()
    private apellidoNombres : string;
    
    @OneToMany(type => Clase, clase => clase.profesor)
    @JoinColumn()
    public clases : Clase[];

    constructor (id : number, apellidoNombres : string) {
        this.idProfesor = id;
        this.apellidoNombres = apellidoNombres;
    }

    public getIdProfesor(): number { return this.idProfesor; }
    public setIdProfesor(idProfesor: number): void { this.idProfesor = idProfesor; }
    public getApellidoNombres(): string { return this.apellidoNombres; }
    public setApellidoNombres(apellidoNombres: string): void { this.apellidoNombres = apellidoNombres; }
}