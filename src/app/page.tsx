"use client";
import { CardProduto } from "@/components/CardProduto";
import { InputPesquisa } from "@/components/InputPesquisa";
import { ProdutoItf } from "@/utils/types/ProdutoItf";
import { useEffect, useState } from "react";
import { useClienteStore } from "@/Context/ClienteContext";

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoItf[]>([]);
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
      const dados = await response.json();
      setProdutos(dados);
    }
    buscaDados();

    async function buscaCliente(id: string) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${id}`
      );
      const dados = await response.json();
      logaCliente(dados);
    }
    if (typeof window !== "undefined" && localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey");
      buscaCliente(idCliente as string);
    }
  }, []);

  const listaProdutos = produtos.map((produto) => (
    <CardProduto data={produto} key={produto.id} />
  ));

  return (
    <>
      <InputPesquisa setProdutos={setProdutos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Produtos{" "}
          <span className="underline underline-offset-3 decoration-8 decoration-[#5ce1e6] dark:decoration-[#5ce1e6]">
            em oferta
          </span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaProdutos}
        </div>
      </div>
    </>
  );
}
