import { Clase } from "src/clase/clase.entity";
import { Estudiante } from "src/estudiante/estudiante.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('asistencia')
export class Asistencia {
    @PrimaryGeneratedColumn()
    private idAsistencia : number;
    @ManyToOne(type => Clase)
    public clase : Clase;
    @ManyToOne(type => Estudiante)
    public estudiante : Estudiante;
    @Column()
    private fecha : string;
    
    constructor (clase : Clase, estudiante : Estudiante, fecha : string) {
        this.clase = clase;
        this.estudiante = estudiante;
        this.fecha = fecha;
    }
    
    public getIdAsistencia(): number { return this.idAsistencia; }
    public getClase(): Clase { return this.clase; }
    public setClase(clase: Clase): void { this.clase = clase; }
    public getEstudiante(): Estudiante { return this.estudiante; }
    public setEstudiante(estudiante: Estudiante): void { this.estudiante = estudiante; }
    public getFecha(): string { return this.fecha; }
    public setFecha(fecha: string): void { this.fecha = fecha; }
}