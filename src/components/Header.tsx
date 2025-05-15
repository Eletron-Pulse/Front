import Link from "next/link";

export function Header() {
    return (
        <nav className="border-gray-500 bg-gray-700 dark:bg-gray-900 dark:border-orange-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {}
                <Link href="/" className="flex items-center space-x-5 rtl:space-x-reverse">
                    <img src="./logo.png" className="h-22" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
                        Minha Loja de eletreônicos
                    </span>
                </Link>

                {}
                <div className="flex items-center space-x-12">
                    {}
                    <Link
                        href="/login"
                        className="flex items-center space-x-2 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        <img
                            src="/imageLogin.jpeg" 
                            alt="Foto do Usuário"
                            className="w-8 h-8 rounded-full border-2 border-white"
                        />
                        <span>Entre ou cadastre-se</span>
                    </Link>

                    {}
                    <Link href="/carrinho" className="text-white hover:text-gray-300">
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
    );
}