import { Escuela } from "src/escuela/escuela.entity";
import { Estudiante } from "src/estudiante/estudiante.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, JoinColumn, ManyToOne } from "typeorm";

@Entity('clases')
export class Clase {
    @PrimaryGeneratedColumn()
    private idClase : number;
    @Column()
    private nombre : string;
    // @Column()
    // private idEscuela : number;
    // @Column()
    // private idProfesor : number;
    
    @ManyToOne(type => Escuela, escuela => escuela.clases)
    @JoinColumn()
    public escuela : Escuela;

    @ManyToOne(type => Profesor, profesor => profesor.clases)
    @JoinColumn()
    public profesor : Profesor;

    @ManyToMany(type => Estudiante)
    @JoinTable()
    public estudiantes : Estudiante[];

    constructor (nombre : string, escuela : Escuela, profesor : Profesor) {
        this.nombre = nombre;
        // this.idEscuela = idEscuela;
        // this.idProfesor = idProfesor;
        this.escuela = escuela;
        this.profesor = profesor;
    }

    public getIdClase(): number { return this.idClase; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    // public getIdEscuela(): number { return this.idEscuela; }
    // public setIdEscuela(idEscuela: number): void { this.idEscuela = idEscuela; }
    // public getIdProfesor(): number { return this.idProfesor; }
    // public setIdProfesor(idProfesor: number): void { this.idProfesor = idProfesor; }
    public getEscuela(): Escuela { return this.escuela; }
    public setEscuela(escuela: Escuela): void { this.escuela = escuela; }
    public getProfesor(): Profesor { return this.profesor; }
    public setProfesor(profesor: Profesor): void { this.profesor = profesor; }
}