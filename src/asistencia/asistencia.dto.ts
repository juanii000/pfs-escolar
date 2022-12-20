import { Clase } from "src/clase/clase.entity";
import { Estudiante } from "src/estudiante/estudiante.entity";

export class AsistenciaDTO {
    readonly clase : Clase;
    readonly estudiante : Estudiante;
    readonly fecha : string;
}