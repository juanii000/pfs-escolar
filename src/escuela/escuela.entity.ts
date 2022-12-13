
import { Ciudad } from "src/ciudad/ciudad.entity";
import { Clase } from "src/clase/clase.entity";
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('escuelas')
export class Escuela {
    @PrimaryColumn()
    private idEscuela : number;
    @Column()
    private nombre : string;
    @Column()
    private domicilio : string;

    @ManyToOne(type => Ciudad, ciudad => ciudad.escuelas)
    @JoinColumn()
    public ciudad : Ciudad;

    @OneToMany(type => Clase, clase => clase.escuela)
    @JoinColumn()
    public clases : Clase[];

    constructor (id : number, nombre : string, domicilio : string, ciudad : Ciudad) {
        this.idEscuela = id;
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.ciudad = ciudad
    }

    public getIdEscuela(): number { return this.idEscuela; }
    public setIdEscuela(idEscuela: number): void { this.idEscuela = idEscuela; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getDomicilio(): string { return this.domicilio; }
    public setDomicilio(domicilio: string): void { this.domicilio = domicilio; }
    public getCiudad(): Ciudad { return this.ciudad; }
    public setCiudad(ciudad: Ciudad): void { this.ciudad = ciudad; }
}