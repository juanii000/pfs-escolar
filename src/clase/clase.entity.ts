import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('clases')
export class Clase {
    @PrimaryColumn()
    private idClase : number;
    @Column()
    private nombre : string;
    @Column()
    private idEscuela : number;
    @Column()
    private idProfesor : number;

    constructor (idClase : number, nombre : string, idEscuela : number, idProfesor : number) {
        this.idClase = idClase;
        this.nombre = nombre;
        this.idEscuela = idEscuela;
        this.idProfesor = idProfesor;
    }

    public getIdClase(): number { return this.idClase; }
    public setIdClase(idClase: number): void { this.idClase = idClase; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getIdEscuela(): number { return this.idEscuela; }
    public setIdEscuela(idEscuela: number): void { this.idEscuela = idEscuela; }
    public getIdProfesor(): string { return this.nombre; }
    public setIdProfesor(idProfesor: number): void { this.idProfesor = idProfesor; }
}