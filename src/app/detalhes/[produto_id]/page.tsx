"use client"
import { ProdutoItf } from "@/utils/types/ProdutoItf"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useClienteStore } from "@/Context/ClienteContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import Link from "next/link"

// Interface para o formulário de comentário
type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()
  const [produto, setProduto] = useState<ProdutoItf>()
  const { cliente } = useClienteStore()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${params.produto_id}`)
      const dados = await response.json()
      setProduto(dados)
    }
    buscaDados()
  }, [params.produto_id])

  const listaFotos = produto?.imagens?.map(foto => (
    <div key={foto.id}>
      <img src={foto.url} alt={foto.descricao}
        title={foto.descricao}
        className="h-52 max-w-80 rounded-lg" />
    </div>
  ))

  async function enviaComentario(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/comentarios`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        produtoId: Number(params.produto_id),
        texto: data.descricao // Corrigido para o campo esperado pelo backend
      })
    })

    if (response.status === 201) {
      toast.success("Obrigado. Seu comentário foi enviado. Aguarde retorno")
      reset()
    } else {
      let msg = "Erro... Não foi possível enviar seu comentário"
      try {
        const erro = await response.json()
        msg += erro?.message ? `: ${erro.message}` : ''
      } catch {}
      toast.error(msg)
      console.error('Erro ao comentar:', response.status, response.statusText, await response.text())
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen py-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-white bg-[#845bdf] rounded-lg hover:bg-[#6b46c1] focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-900"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
            </svg>
            Voltar
          </Link>

          <section className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            {produto?.imagem && (
              <>
                <img
                  className="object-cover w-full md:w-1/2 rounded-lg shadow-md"
                  src={produto.imagem}
                  alt={`Imagem do Produto ${produto.nome}`}
                />
                <div className="flex flex-col justify-between p-6 md:ml-6 w-full">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {produto.marca?.nome} - {produto.nome}
                  </h1>
                  <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Categoria:</strong> {produto.categoria}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Preço: R$ <span className="text-[#845bdf]">{Number(produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</span>
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Estoque:</strong> {produto.estoque} unidades
                  </p>
                  {produto.descricao && (
                    <p className="text-lg text-gray-700 dark:text-gray-400 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                      <strong>Descrição:</strong> {produto.descricao}
                    </p>
                  )}
                  {/* Botão Adicionar ao Carrinho */}
                  {cliente.id ? (
                    <button
                      className="w-full px-4 py-2 text-white bg-[#845bdf] rounded-lg hover:bg-[#6b46c1] focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-900 mb-4"
                    >
                      Adicionar ao Carrinho
                    </button>
                  ) : (
                    <button
                      className="w-full px-4 py-2 text-white bg-gray-400 rounded-lg cursor-not-allowed mb-4"
                      disabled
                    >
                      Identifique-se para adicionar ao carrinho
                    </button>
                  )}
                  {/* ...mantém o restante do conteúdo, como comentários... */}
                  {cliente.id ?
                    <>
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        🙂 Deixe um comentário sobre este produto!
                      </h3>
                      <form onSubmit={handleSubmit(enviaComentario)}>
                        <input
                          type="text"
                          id="cliente-info"
                          className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={`${cliente.nome} (${cliente.email})`}
                          disabled
                          readOnly
                        />
                        <textarea
                          id="descricao"
                          className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Deixe seu comentário"
                          required
                          {...register("descricao")}
                        ></textarea>
                        <button type="submit" className="text-white bg-[#845bdf] hover:bg-[#6b46c1] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#845bdf] dark:hover:bg-[#6b46c1] dark:focus:ring-purple-800">Enviar Comentário</button>
                      </form>
                    </>
                    :
                    <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                      😎 Gostou? Identifique-se e deixe um comentário!
                    </h2>
                  }
                </div>
              </>
            )}
          </section>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Imagens do Produto</h2>
            <div className="flex overflow-x-auto space-x-4">{listaFotos}</div>
          </div>
        </div>
      </div>
    </>
  )
}