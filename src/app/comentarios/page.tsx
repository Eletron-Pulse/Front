'use client'
import './page.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "@/Context/ClienteContext";
import { ComentarioItf } from "@/utils/types/ComentarioItf";

export default function Comentarios() {
  const [comentarios, setComentarios] = useState<ComentarioItf[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      // Busca todos os comentários e filtra apenas os do cliente logado
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/comentarios`)
      const dados = await response.json()
      const comentariosCliente = dados.filter((comentario: any) => comentario.clienteId === cliente.id)
      setComentarios(comentariosCliente)
    }
    if (cliente.id) buscaDados()
  }, [cliente.id])

  function dataDMA(data: string) {
    const ano = data.substring(0, 4)
    const mes = data.substring(5, 7)
    const dia = data.substring(8, 10)
    return dia + "/" + mes + "/" + ano
  }

  const comentariosTable = comentarios.map(comentario => (
    <tr key={comentario.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <p><b>{comentario.produto?.marca?.nome ?? '-'} - {comentario.produto?.nome ?? '-'}</b></p>
        <p className='mt-3'>Categoria: {comentario.produto?.categoria ?? '-'} -
          R$: {comentario.produto ? Number(comentario.produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 }) : '-'}</p>
      </th>
      <td className="px-6 py-4">
        {comentario.produto?.imagem ? (
          <img src={comentario.produto.imagem} className="imagemProduto" alt={`Imagem de ${comentario.produto.nome}`} />
        ) : (
          <span>-</span>
        )}
      </td>
      <td className="px-6 py-4">
        <p><b>{(comentario as any).texto ?? comentario.descricao ?? '-'}</b></p>
        <p><i>Enviado em: {dataDMA(comentario.createdAt)}</i></p>
      </td>
      <td className="px-6 py-4">
        {comentario.resposta ?
          <>
            <p><b>{comentario.resposta}</b></p>
            <p><i>Respondido em: {comentario.updatedAt ? dataDMA(comentario.updatedAt) : '-'}</i></p>
          </>
          :
          <i>Aguardando...</i>}
      </td>
    </tr>
  ))

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Listagem de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Meus Comentários</span></h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Produto
            </th>
            <th scope="col" className="px-6 py-3">
              Foto
            </th>
            <th scope="col" className="px-6 py-3">
              Comentário
            </th>
            <th scope="col" className="px-6 py-3">
              Resposta
            </th>
          </tr>
        </thead>
        <tbody>
          {comentariosTable}
        </tbody>
      </table>
    </section>
  )
}