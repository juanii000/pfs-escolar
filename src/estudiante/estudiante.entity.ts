import { Clase } from "src/clase/clase.entity";
import { Entity, PrimaryColumn, Column, JoinTable, ManyToMany } from "typeorm";

@Entity('estudiantes')
export class Estudiante {
    @PrimaryColumn()
    private idEstudiante : number;
    @Column()
    private apellidoNombres : string;
    @Column()
    private fechaNacimiento : string;

    constructor (id : number, apellidoNombres : string, fechaNacimiento : string) {
        this.idEstudiante = id;
        this.apellidoNombres = apellidoNombres;
        this.fechaNacimiento = fechaNacimiento;
    }

    public getIdEstudiante(): number { return this.idEstudiante; }
    public setIdEstudiante(idEstudiante: number): void { this.idEstudiante = idEstudiante; }
    public getApellidoNombres(): string { return this.apellidoNombres; }
    public setApellidoNombres(apellidoNombres: string): void { this.apellidoNombres = apellidoNombres; }
    public getFechaNacimiento(): string { return this.fechaNacimiento; }
    public setFechaNacimiento(fechaNacimiento: string): void { this.fechaNacimiento = fechaNacimiento; }
}