"use client"
import { ProdutoItf } from "@/utils/types/ProdutoItf"
import { ComentarioItf } from "@/utils/types/ComentarioItf"
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
  const [comentarios, setComentarios] = useState<ComentarioItf[]>([])
  const [loadingComentarios, setLoadingComentarios] = useState(false)
  const [showAllComentarios, setShowAllComentarios] = useState(false)
  const { cliente } = useClienteStore()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const apiUrl = process.env.NEXT_PUBLIC_URL_API || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/produtos/${params.produto_id}`)
      const dados = await response.json()
      setProduto(dados)
      // Debug: veja o que chega do backend
      console.log('Produto carregado:', dados)
      if (dados?.imagens) {
        console.log('Imagens do produto:', dados.imagens)
      }
    }
    buscaDados()
  }, [params.produto_id])

  // Buscar comentários do produto
  useEffect(() => {
    async function buscaComentarios() {
      setLoadingComentarios(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_URL_API || 'http://localhost:3001'
        console.log('Buscando comentários para produto:', params.produto_id, 'Tipo:', typeof params.produto_id)
        console.log('URL da API:', apiUrl)
        
        const response = await fetch(`${apiUrl}/comentarios`)
        console.log('Response status:', response.status)
        if (response.ok) {
          const todosComentarios = await response.json()
          console.log('Todos os comentários recebidos:', todosComentarios)
          
          // Verificar estrutura dos comentários
          if (todosComentarios.length > 0) {
            console.log('Estrutura do primeiro comentário:', todosComentarios[0])
            console.log('produtoId do primeiro comentário:', todosComentarios[0].produtoId, 'Tipo:', typeof todosComentarios[0].produtoId)
          }
          
          // Filtrar comentários do produto atual
          const comentariosDoProduto = todosComentarios.filter((comentario: any) => {
            const match = comentario.produtoId === Number(params.produto_id)
            console.log(`Comentário ${comentario.id}: produtoId=${comentario.produtoId}, params=${params.produto_id}, match=${match}`)
            return match
          })
          console.log('Comentários filtrados para o produto:', comentariosDoProduto)
          setComentarios(comentariosDoProduto)
        } else {
          console.error('Erro ao buscar comentários:', response.status, response.statusText)
          const errorText = await response.text()
          console.error('Erro detalhado:', errorText)
        }
      } catch (error) {
        console.error('Erro ao buscar comentários:', error)
      } finally {
        setLoadingComentarios(false)
      }
    }
    buscaComentarios()
  }, [params.produto_id])

  const fallbackImg = "/logo.png" // imagem padrão caso a do Cloudinary quebre

  const listaFotos = produto?.imagens?.map(foto => (
    <div key={foto.id}>
      <img
        src={foto.url}
        alt={foto.descricao}
        title={foto.descricao}
        className="h-52 max-w-80 rounded-lg"
        onError={e => (e.currentTarget.src = fallbackImg)}
      />
    </div>
  ))

  async function enviaComentario(data: Inputs) {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API || 'http://localhost:3001'
    const comentarioData = {
      clienteId: cliente.id,
      produtoId: Number(params.produto_id),
      texto: data.descricao // Corrigido para o campo esperado pelo backend
    }
    
    console.log('Enviando comentário:', comentarioData)
    console.log('URL da API:', apiUrl)
    
    const response = await fetch(`${apiUrl}/comentarios`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(comentarioData)
    })

    console.log('Response do envio:', response.status, response.statusText)

    if (response.status === 201) {
      toast.success("Obrigado. Seu comentário foi enviado. Aguarde retorno")
      reset()
      
      // Aguardar um pouco antes de recarregar
      setTimeout(async () => {
        console.log('Recarregando comentários após envio...')
        const comentariosResponse = await fetch(`${apiUrl}/comentarios`)
        if (comentariosResponse.ok) {
          const todosComentarios = await comentariosResponse.json()
          console.log('Comentários após envio:', todosComentarios)
          const comentariosDoProduto = todosComentarios.filter((comentario: any) => 
            comentario.produtoId === Number(params.produto_id)
          )
          console.log('Comentários filtrados após envio:', comentariosDoProduto)
          setComentarios(comentariosDoProduto)
        }
      }, 1000)
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

  // Função para formatar data
  function formatarData(dataString: string) {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Comentários para exibir (limitados ou todos)
  const comentariosParaExibir = showAllComentarios ? comentarios : comentarios.slice(0, 3)

  // Debug: verificar estado dos comentários
  console.log('Estado atual dos comentários:', {
    total: comentarios.length,
    paraExibir: comentariosParaExibir.length,
    showAll: showAllComentarios,
    loading: loadingComentarios
  })

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

          <section className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            {produto?.imagem && (
              <>
                {/* Informações do Produto */}
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                  <img
                    className="object-cover w-full md:w-1/2 rounded-lg shadow-md"
                    src={produto.imagem}
                    alt={`Imagem do Produto ${produto.nome}`}
                    onError={e => (e.currentTarget.src = fallbackImg)}
                  />
                  <div className="flex-1 w-full">
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
                        className="w-full md:w-auto px-6 py-3 text-white bg-[#845bdf] rounded-lg hover:bg-[#6b46c1] focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-900 transition-colors duration-300"
                      >
                        Adicionar ao Carrinho
                      </button>
                    ) : (
                      <button
                        className="w-full md:w-auto px-6 py-3 text-white bg-gray-400 rounded-lg cursor-not-allowed"
                        disabled
                      >
                        Identifique-se para adicionar ao carrinho
                      </button>
                    )}
                  </div>
                </div>

                {/* Formulário de Comentário */}
                {cliente.id && (
                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#845bdf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Deixe um comentário sobre este produto!
                    </h3>
                    <form onSubmit={handleSubmit(enviaComentario)} className="space-y-4">
                      <input
                        type="text"
                        id="cliente-info"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={`${cliente.nome} (${cliente.email})`}
                        disabled
                        readOnly
                      />
                      <textarea
                        id="descricao"
                        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Deixe seu comentário sobre este produto..."
                        required
                        rows={3}
                        {...register("descricao")}
                      ></textarea>
                      <button 
                        type="submit" 
                        className="text-white bg-[#845bdf] hover:bg-[#6b46c1] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#845bdf] dark:hover:bg-[#6b46c1] dark:focus:ring-purple-800 transition-colors duration-300"
                      >
                        Enviar Comentário
                      </button>
                    </form>
                  </div>
                )}

                {/* Seção de Comentários */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <svg className="w-6 h-6 mr-2 text-[#845bdf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Comentários dos Clientes
                      <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {comentarios.length}
                      </span>
                    </h2>
                    {!cliente.id && (
                      <Link 
                        href="/login" 
                        className="text-[#845bdf] hover:underline font-medium text-sm"
                      >
                        Faça login para comentar
                      </Link>
                    )}
                  </div>

                  {loadingComentarios ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#845bdf]"></div>
                      <span className="ml-2 text-gray-600">Carregando comentários...</span>
                    </div>
                  ) : comentarios.length > 0 ? (
                    <>
                      <div className="space-y-4">
                        {comentariosParaExibir.map((comentario) => (
                          <div key={comentario.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            {/* Comentário */}
                            <div className="mb-3">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-[#845bdf] rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">
                                      {comentario.clienteId.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {comentario.cliente?.nome || `Cliente ${comentario.clienteId.slice(-4)}`}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {formatarData(comentario.createdAt)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                {comentario.texto || comentario.descricao || comentario.comentario || 'Comentário não disponível'}
                              </p>
                            </div>

                            {/* Resposta (se houver) */}
                            {comentario.resposta && (
                              <div className="ml-8 border-l-2 border-[#845bdf] pl-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-6 h-6 bg-[#5ce1e6] rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <span className="font-medium text-[#845bdf] text-sm">Resposta da Loja</span>
                                  {comentario.updatedAt && (
                                    <span className="text-xs text-gray-500">
                                      {formatarData(comentario.updatedAt)}
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 bg-[#845bdf]/5 p-3 rounded-lg border border-[#845bdf]/10">
                                  {comentario.resposta}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Botão Ver Todos os Comentários */}
                      {comentarios.length > 3 && (
                        <div className="mt-6 text-center">
                          <button
                            onClick={() => setShowAllComentarios(!showAllComentarios)}
                            className="text-[#845bdf] hover:text-[#6b46c1] font-medium flex items-center justify-center mx-auto space-x-2 transition-colors duration-300"
                          >
                            <span>
                              {showAllComentarios ? 'Ver menos comentários' : `Ver todos os ${comentarios.length} comentários`}
                            </span>
                            <svg 
                              className={`w-4 h-4 transition-transform duration-300 ${showAllComentarios ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400">
                        Nenhum comentário ainda. Seja o primeiro a comentar!
                      </p>
                      {!cliente.id && (
                        <Link 
                          href="/login" 
                          className="inline-block mt-2 text-[#845bdf] hover:underline font-medium"
                        >
                          Faça login para comentar
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </section>

          <div className="mt-8">
            <div className="flex overflow-x-auto space-x-4">{listaFotos}</div>
          </div>
        </div>
      </div>
    </>
  )
}