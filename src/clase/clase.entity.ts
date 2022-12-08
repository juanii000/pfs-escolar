import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('clases')
export class Clase {
    @PrimaryGeneratedColumn()
    private idClase : number;
    @Column()
    private nombre : string;
    @Column()
    private idEscuela : number;
    @Column()
    private idProfesor : number;

    constructor (nombre : string, idEscuela : number, idProfesor : number) {
        this.nombre = nombre;
        this.idEscuela = idEscuela;
        this.idProfesor = idProfesor;
    }

    public getIdClase(): number { return this.idClase; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getIdEscuela(): number { return this.idEscuela; }
    public setIdEscuela(idEscuela: number): void { this.idEscuela = idEscuela; }
    public getIdProfesor(): number { return this.idProfesor; }
    public setIdProfesor(idProfesor: number): void { this.idProfesor = idProfesor; }
}