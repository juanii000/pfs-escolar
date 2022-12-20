import { Clase } from "src/clase/clase.entity";
import { Asistencia } from "src/asistencia/asistencia.entity";
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, JoinColumn, OneToMany } from "typeorm";

@Entity('estudiantes')
export class Estudiante {
    @PrimaryColumn()
    private idEstudiante : number;
    @Column()
    private apellidoNombres : string;
    @Column()
    private fechaNacimiento : string;

    @ManyToMany(type => Clase, (clase) => clase.estudiantes)
    @JoinTable({ name: 'clases_estudiantes_estudiantes'})
    public clases : Clase[];

    @OneToMany(type => Asistencia, asistencia => asistencia.estudiante)
    @JoinColumn()
    public asistencias : Asistencia[];

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