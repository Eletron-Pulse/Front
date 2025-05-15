import { ProdutoItf } from "@/utils/types/ProdutoItf";
import Link from "next/link";

export function CardProduto({ data }: { data: ProdutoItf }) {
    if (!data || !data.marca) {
        return <p>Carregando...</p>;
    }

    return (
        <Link
            href={`/detalhes/${data.id}`}
            className="block max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
            <img
                className="rounded-t-lg"
                src={data.imagem}
                alt={`Imagem de ${data.nome}`}
            />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.marca.nome} - {data.nome}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Categoria: {data.categoria}
                </p>
                <p className="mb-3 font-extrabold text-gray-700 dark:text-gray-400">
                    Preço: R$ {Number(data.preco).toLocaleString("pt-br", {
                        minimumFractionDigits: 2,
                    })}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Estoque: {data.estoque} unidades
                </p>
            </div>
        </Link>
    );
}