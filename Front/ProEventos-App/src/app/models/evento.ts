import { Lote } from "./lote";
import { Palestrante } from "./palestrante";
import { RedeSocial } from "./rede-social";

export interface Evento {
    id?: number;
    local: string;
    dataEvento: Date;
    tema: string;
    quantidadeDePessoas: number;
    imagemUrl: string;
    telefone: string  
    email: string;
    lotes?: Lote[];
    redesSociais?: RedeSocial;
    palestrantesEventos?: Palestrante[];
}
