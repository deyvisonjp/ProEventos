import { RedeSocial } from "./rede-social";

export interface Palestrante {
    Id: number;
    Nome: string;
    MiniCurriculo: string;
    ImagemURL: string; 
    Telefone: string; 
    Email: string; 
    RedeSocial: RedeSocial[]; 
    PalestranteEvento: Palestrante[];  
}
