import { Evento } from "./evento";
import { Palestrante } from "./palestrante";

export interface RedeSocial {
    id: number; 
    nome: string;
    uRL: string; 
    eventoId: number; 
    palestranteId: number;
}
