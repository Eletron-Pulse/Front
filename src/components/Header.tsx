"use client"
import Link from "next/link"
import { useClienteStore } from "@/Context/ClienteContext"
import { useRouter } from "next/navigation"

export function Header() {
    const { cliente, deslogaCliente } = useClienteStore()
    const router = useRouter()

    function clienteSair() {
        if (confirm("Confirma saída do sistema?")) {
            deslogaCliente()
            if (localStorage.getItem("clienteKey")) {
                localStorage.removeItem("clienteKey")
            }
            router.push("/login")
        }
    }

    return (
        <nav className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg border-b border-gray-600/30 dark:border-gray-700/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo e Nome da Loja */}
                    <Link href="/" className="flex items-center space-x-4 group">
                        <div className="relative">
                            <img src="/logo.png" className="h-16 w-auto transition-transform duration-300 group-hover:scale-110" alt="Logo" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#845bdf] to-[#5ce1e6] opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white group-hover:text-[#845bdf] transition-colors duration-300">
                                Eletron
                            </span>
                            <span className="text-sm text-gray-300 group-hover:text-[#5ce1e6] transition-colors duration-300">
                                Pulse
                            </span>
                        </div>
                    </Link>

                    {/* Menu de Navegação */}
                    <div className="flex items-center space-x-6">
                        {cliente.id ? (
                            <>
                                {/* Nome do Cliente */}
                                <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                                    <div className="w-2 h-2 bg-[#5ce1e6] rounded-full animate-pulse"></div>
                                    <span className="text-white font-medium text-sm">
                                        Olá, {cliente.nome}
                                    </span>
                                </div>

                                {/* Botão Meus Comentários */}
                                <Link 
                                    href="/comentarios" 
                                    className="relative overflow-hidden bg-gradient-to-r from-[#845bdf] to-[#6b46c1] hover:from-[#6b46c1] hover:to-[#845bdf] text-white font-medium rounded-full px-6 py-2.5 text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#845bdf]/25 focus:outline-none focus:ring-2 focus:ring-[#845bdf] focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="relative z-10 flex items-center space-x-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span>Meus Comentários</span>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                </Link>

                                {/* Botão Sair */}
                                <button 
                                    onClick={clienteSair}
                                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                                >
                                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="font-medium">Sair</span>
                                </button>
                            </>
                        ) : (
                            <Link 
                                href="/login" 
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="font-medium">Entre ou cadastre-se</span>
                            </Link>
                        )}

                        {/* Carrinho */}
                        <Link 
                            href="/carrinho" 
                            className="relative group"
                        >
                            <div className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-6 h-6 text-white group-hover:text-[#845bdf] transition-colors duration-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H18.6L17 13M7 13L5.4 5M17 13l1.6 8M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                                    />
                                </svg>
                                {/* Indicador de itens no carrinho (opcional) */}
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#5ce1e6] rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-gray-900">0</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}