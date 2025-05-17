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
        <nav className="border-gray-500 bg-gray-700 dark:bg-gray-900 dark:border-orange-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-5 rtl:space-x-reverse">
                    <img src="/logo.png" className="h-12" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
                        Minha Loja de eletrônicos
                    </span>
                </Link>
                <div className="flex items-center space-x-12">
                    {cliente.id ? (
                        <>
                            <span className="text-white font-bold">
                                {cliente.nome}
                            </span>
                            <Link href="/comentarios" className="text-white font-bold bg-[#845bdf] hover:bg-[#6b46c1] focus:ring-2 focus:outline-none focus:ring-purple-300 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                Meus Comentários
                            </Link>
                            <span className="cursor-pointer font-bold text-white hover:text-[#845bdf]" onClick={clienteSair}>
                                Sair
                            </span>
                        </>
                    ) : (
                        <Link href="/login" className="block py-2 px-3 md:p-0 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#845bdf] dark:text-white md:dark:hover:text-[#845bdf] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Entre ou cadastre-se
                        </Link>
                    )}
                    <Link href="/carrinho" className="text-white hover:text-[#845bdf]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H18.6L17 13M7 13L5.4 5M17 13l1.6 8M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    )
}