import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('profesores')
export class Profesor {
    @PrimaryColumn()
    private idProfesor : number;
    @Column()
    private apellidoNombres : string;

    constructor (id : number, apellidoNombres : string) {
        this.idProfesor = id;
        this.apellidoNombres = apellidoNombres;
    }

    public getIdProfesor(): number { return this.idProfesor; }
    public setIdProfesor(idProfesor: number): void { this.idProfesor = idProfesor; }
    public getApellidoNombres(): string { return this.apellidoNombres; }
    public setApellidoNombres(apellidoNombres: string): void { this.apellidoNombres = apellidoNombres; }
}