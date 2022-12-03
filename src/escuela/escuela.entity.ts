import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('escuelas')
export class Escuela {
    @PrimaryColumn()
    private idEscuela : number;
    @Column()
    private nombre : string;
    @Column()
    private domicilio : string;
    @Column()
    private idCiudad : number;

    constructor (id : number, nombre : string, domicilio : string, ciudad : number) {
        this.idEscuela = id;
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.idCiudad = ciudad
    }

    public getIdEscuela(): number { return this.idEscuela; }
    public setIdEscuela(idEscuela: number): void { this.idEscuela = idEscuela; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getDomicilio(): string { return this.domicilio; }
    public setDomicilio(domicilio: string): void { this.domicilio = domicilio; }
    public getIdCiudad(): number { return this.idCiudad; }
    public setIdCiudad(idCiudad: number): void { this.idCiudad = idCiudad; }
}