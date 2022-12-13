import { Escuela } from "src/escuela/escuela.entity";
import { Estudiante } from "src/estudiante/estudiante.entity";
import { Profesor } from "src/profesor/profesor.entity";

export class ClaseDTO {
    readonly nombre : string;
    readonly escuela : Escuela;
    readonly profesor : Profesor;
    readonly estudiantes : Estudiante[];
}