"use client";
import { ProdutoItf } from "@/utils/types/ProdutoItf";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Detalhes() {
  const params = useParams();
  const [produto, setProduto] = useState<ProdutoItf>();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${params.produto_id}`);
      const dados = await response.json();
      setProduto(dados);
    }
    buscaDados();
  }, [params.produto_id]);

  const listaImagens = produto?.imagens?.map((imagem) => (
    <div key={imagem.id} className="p-2">
      <img
        src={imagem.url}
        alt={imagem.descricao}
        title={imagem.descricao}
        className="h-52 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      />
    </div>
  ));

  return (
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
              <div className="flex flex-col justify-between p-6 md:ml-6">
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
                <button
                  className="w-full px-4 py-2 text-white bg-[#845bdf] rounded-lg hover:bg-[#6b46c1] focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-900"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </>
          )}
        </section>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Imagens do Produto</h2>
          <div className="flex overflow-x-auto space-x-4">{listaImagens}</div>
        </div>
      </div>
    </div>
  );
}