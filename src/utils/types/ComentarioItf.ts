import { ProdutoItf } from "./ProdutoItf"

export interface ComentarioItf {
  id: number
  clienteId: string
  produtoId: number
  produto: ProdutoItf
  descricao: string
  texto?: string
  comentario?: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
  cliente?: {
    id: string
    nome: string
    email: string
  }
}