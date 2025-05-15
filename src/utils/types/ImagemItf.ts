import { ProdutoItf } from "./ProdutoItf";

export interface ImagemItf {
  id: number
  descricao: string
  produtoId: number
  url: string
  produto: ProdutoItf
}