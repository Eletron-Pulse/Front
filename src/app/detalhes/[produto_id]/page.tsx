"use client"
import { ProdutoItf } from "@/utils/types/ProdutoItf"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useClienteStore } from "@/Context/ClienteContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

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
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {produto?.imagem &&
          <>
            <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
              src={produto.imagem} alt="Imagem do Produto" />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {produto.marca?.nome} - {produto.nome}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Categoria: {produto.categoria}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Preço R$: {Number(produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {produto.descricao}
              </p>
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
        }
      </section>
      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaFotos}
      </div>
    </>
  )
}