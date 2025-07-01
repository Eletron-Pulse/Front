import { ProdutoItf } from "@/utils/types/ProdutoItf";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  termo: string;
};

type InputPesquisaProps = {
  setProdutos: React.Dispatch<React.SetStateAction<ProdutoItf[]>>;
};

export function InputPesquisa({ setProdutos }: InputPesquisaProps) {
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      toast.error("Informe, no mínimo, 2 caracteres");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/pesquisa/${data.termo}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      
      const dados = await response.json();
       
      if (dados.length === 0) {
        toast.error("Nenhum produto encontrado");
        setFocus("termo");
        reset({ termo: "" });
       
        return;
      }

      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast.error("Erro ao buscar produtos. Tente novamente.");
    }
  }

  async function mostraDestaques() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
      if (!response.ok) {
        throw new Error("Erro ao buscar destaques");
      }
      const dados = await response.json();
      reset({ termo: "" });
      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao buscar destaques:", error);
      toast.error("Erro ao buscar destaques. Tente novamente.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Formulário de Pesquisa */}
          <form className="flex-1 w-full" onSubmit={handleSubmit(enviaPesquisa)}>
            <div className="relative group">
              {/* Ícone de Pesquisa */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400 group-focus-within:text-[#845bdf] transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Input de Pesquisa */}
              <input
                type="search"
                id="default-search"
                className="block w-full pl-12 pr-32 py-4 text-gray-900 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#845bdf] focus:border-[#845bdf] dark:text-white dark:placeholder-gray-400 dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-all duration-300 shadow-sm hover:shadow-md"
                placeholder="Busque por nome, categoria ou preço máximo..."
                required
                {...register("termo")}
              />

              {/* Botão de Pesquisa */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#845bdf] to-[#6b46c1] hover:from-[#6b46c1] hover:to-[#845bdf] text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#845bdf]/25 focus:outline-none focus:ring-2 focus:ring-[#845bdf] focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Buscar</span>
                </span>
              </button>
            </div>
          </form>

          {/* Botão Exibir Produtos */}
          <button
            type="button"
            onClick={mostraDestaques}
            className="w-full lg:w-auto bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-200 font-medium rounded-xl px-8 py-4 text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#845bdf] focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800"
          >
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Ver Todos</span>
            </span>
          </button>
        </div>

        {/* Dicas de Pesquisa */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Dica: Digite pelo menos 2 caracteres</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Ex: "smartphone", "notebook", "1000"</span>
        </div>
      </div>
    </div>
  );
}