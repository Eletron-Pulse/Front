import { ProdutoItf } from "@/utils/types/ProdutoItf";
import Link from "next/link";

export function CardProduto({ data }: { data: ProdutoItf }) {
    if (!data || !data.marca) {
        return (
            <div className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-50 mb-3"></div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
            </div>
        );
    }

    const isLowStock = data.estoque <= 5;
    const isOutOfStock = data.estoque === 0;

    return (
        <Link
            href={`/detalhes/${data.id}`}
            className="group relative block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700"
        >
            {/* Badge de Estoque */}
            <div className="absolute top-3 right-3 z-10">
                {isOutOfStock ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></div>
                        Esgotado
                    </span>
                ) : isLowStock ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5 animate-pulse"></div>
                        Últimas {data.estoque}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                        Em estoque
                    </span>
                )}
            </div>

            {/* Imagem do Produto */}
            <div className="relative overflow-hidden">
                <div className="h-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-2">
                    <img
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                        src={data.imagem}
                        alt={`Imagem de ${data.nome}`}
                        onError={(e) => {
                            e.currentTarget.src = '/fallback-product.png';
                        }}
                    />
                </div>
                
                {/* Overlay gradiente no hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Botão de ação flutuante */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
                        <svg className="w-4 h-4 text-[#845bdf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-4">
                {/* Marca */}
                <div className="mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#845bdf]/10 text-[#845bdf] dark:bg-[#845bdf]/20">
                        {data.marca.nome}
                    </span>
                </div>

                {/* Nome do Produto */}
                <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white group-hover:text-[#845bdf] transition-colors duration-300 line-clamp-2">
                    {data.nome}
                </h3>

                {/* Categoria */}
                <p className="mb-3 text-xs text-gray-600 dark:text-gray-400 flex items-center">
                    <svg className="w-3 h-3 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {data.categoria}
                </p>

                {/* Preço */}
                <div className="mb-3">
                    <div className="flex items-baseline space-x-1">
                        <span className="text-lg font-bold text-[#845bdf]">
                            R$ {Number(data.preco).toLocaleString("pt-br", {
                                minimumFractionDigits: 2,
                            })}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            à vista
                        </span>
                    </div>
                </div>

                {/* Estoque */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>{data.estoque} unidades</span>
                    </div>
                    
                    {/* Botão de ação */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                        <div className="bg-gradient-to-r from-[#845bdf] to-[#6b46c1] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                            Ver detalhes
                        </div>
                    </div>
                </div>
            </div>

            {/* Borda animada no hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#845bdf]/20 transition-colors duration-300 pointer-events-none"></div>
        </Link>
    );
}