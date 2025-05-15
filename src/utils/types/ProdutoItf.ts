import { MarcaItf } from "./MarcaItf";
import { ImagemItf } from "./ImagemItf";

export interface ProdutoItf {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    estoque: number;
    destaque?: boolean;
    imagem: string;
    descricao?: string;
    createdAt: Date;
    updatedAt: Date;
    marcaId: number;
    marca: MarcaItf;
    imagens: ImagemItf[]; // Array de imagens relacionadas ao produto
}