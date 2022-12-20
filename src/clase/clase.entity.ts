import { Escuela } from "src/escuela/escuela.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Estudiante } from "src/estudiante/estudiante.entity";
import { Asistencia } from "src/asistencia/asistencia.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, JoinColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";

@Entity('clases')
export class Clase {
    @PrimaryGeneratedColumn()
    private idClase : number;
    @Column()
    private nombre : string;
    @ManyToOne(type => Escuela, escuela => escuela.clases)
    @JoinColumn()
    public escuela : Escuela;
    @ManyToOne(type => Profesor, profesor => profesor.clases)
    @JoinColumn()
    public profesor : Profesor;

    @ManyToMany(type => Estudiante)
    @JoinTable()
    public estudiantes : Estudiante[];

    @OneToMany(type => Asistencia, asistencia => asistencia.clase)
    @JoinColumn()
    public asistencias : Asistencia[];

    constructor (nombre : string, escuela : Escuela, profesor : Profesor) {
        this.nombre = nombre;
        this.escuela = escuela;
        this.profesor = profesor;
    }

    public getIdClase(): number { return this.idClase; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getEscuela(): Escuela { return this.escuela; }
    public setEscuela(escuela: Escuela): void { this.escuela = escuela; }
    public getProfesor(): Profesor { return this.profesor; }
    public setProfesor(profesor: Profesor): void { this.profesor = profesor; }
}