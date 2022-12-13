import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('ingreso')
export class Login {
    @PrimaryColumn()
    private usuario : string;
    @Column()
    private palabra : string;
    
    constructor (usuario : string, palabra : string) {
        this.usuario = usuario;
        this.palabra = palabra;
    }

    public getUsuario(): string { return this.usuario; }
    public setUsuario(usuario: string): void { this.usuario = usuario; }
    public getPalabra(): string { return this.palabra; }
    public setPalabra(palabra: string): void { this.palabra = palabra; }
}