import { type } from "os";
import { Escuela } from "src/escuela/escuela.entity";
import { Entity, PrimaryColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";

@Entity('ciudades')
export class Ciudad {
    @PrimaryColumn()
    private idCiudad : number;
    @Column()
    private nombre : string;
    
    @OneToMany(type => Escuela, escuela => escuela.ciudad)
    @JoinColumn()
    public escuelas : Escuela[];

    constructor (id : number, nombre : string) {
        this.idCiudad = id;
        this.nombre = nombre;
    }

    public getIdCiudad(): number { return this.idCiudad; }
    public setIdCiudad(idCiudad: number): void { this.idCiudad = idCiudad; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
}