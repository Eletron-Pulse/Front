"use client"
import { useState } from "react"
import { toast } from "sonner"

export default function RecuperarSenha() {
  const [email, setEmail] = useState("")
  const [codigo, setCodigo] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [repetirSenha, setRepetirSenha] = useState("")
  const [etapa, setEtapa] = useState<"solicitar" | "alterar">("solicitar")
  const [showNovaSenha, setShowNovaSenha] = useState(false)
  const [showRepetirSenha, setShowRepetirSenha] = useState(false)

  async function solicitarCodigo(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      toast.error("Informe o e-mail")
      return
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/recuperar-senha`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
    const data = await response.json()
    if (response.ok) {
      toast.success(data.mensagem || "Código enviado para o e-mail!")
      setEtapa("alterar")
    } else {
      toast.error(data.erro || "Erro ao solicitar código")
    }
  }

  async function alterarSenha(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !codigo || !novaSenha || !repetirSenha) {
      toast.error("Preencha todos os campos!")
      return
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/alterar-senha`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, codigo, novaSenha, repetirSenha })
    })
    const data = await response.json()
    if (response.ok) {
      toast.success(data.mensagem || "Senha alterada com sucesso!")
      setEtapa("solicitar")
      setEmail("")
      setCodigo("")
      setNovaSenha("")
      setRepetirSenha("")
    } else {
      toast.error(data.erro || "Erro ao alterar senha")
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#845bdf]/30 via-[#5ce1e6]/20 to-[#232946]/40 dark:from-[#232946] dark:via-[#845bdf]/20 dark:to-[#121212] transition-colors duration-500">
      <div className="flex flex-col items-center px-6 py-8 mx-auto w-full max-w-md">
        <div className="w-full bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 backdrop-blur-md">
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white text-center mb-2">
              Recuperar Senha
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Digite seu e-mail para receber o código de recuperação</p>
            {etapa === "solicitar" ? (
              <form onSubmit={solicitarCodigo} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail cadastrado</label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-colors"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="w-full text-white bg-gradient-to-r from-[#845bdf] to-[#5ce1e6] hover:from-[#6b46c1] hover:to-[#3bc9db] focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold rounded-lg text-base px-5 py-3 text-center shadow-lg transition-all duration-300 dark:from-[#845bdf] dark:to-[#232946] dark:hover:from-[#6b46c1] dark:hover:to-[#121212] dark:focus:ring-purple-800">
                  Solicitar código
                </button>
              </form>
            ) : (
              <form onSubmit={alterarSenha} className="space-y-5">
                <div>
                  <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código de recuperação</label>
                  <input
                    type="text"
                    id="codigo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-colors"
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="novaSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nova senha</label>
                  <div className="relative">
                    <input
                      type={showNovaSenha ? "text" : "password"}
                      id="novaSenha"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 pr-10 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-colors"
                      value={novaSenha}
                      onChange={e => setNovaSenha(e.target.value)}
                      required
                    />
                    <button type="button" tabIndex={-1} onClick={() => setShowNovaSenha(!showNovaSenha)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300 focus:outline-none"
                      aria-label={showNovaSenha ? "Ocultar senha" : "Exibir senha"}>
                      {showNovaSenha ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.952 6.108 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.02M6.53 6.53A6.75 6.75 0 0 1 12 5.25c3.642 0 7.714 2.798 9.75 6.75a10.478 10.478 0 0 1-2.042 2.727M6.53 6.53l10.94 10.94M6.53 6.53A10.478 10.478 0 0 0 2.25 12c.457.887 1.05 1.72 1.73 2.477m2.55-2.55l10.94 10.94" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c2.036-3.952 6.108-6.75 9.75-6.75s7.714 2.798 9.75 6.75c-2.036 3.952-6.108 6.75-9.75 6.75S4.286 15.952 2.25 12z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="repetirSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir nova senha</label>
                  <div className="relative">
                    <input
                      type={showRepetirSenha ? "text" : "password"}
                      id="repetirSenha"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 pr-10 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-colors"
                      value={repetirSenha}
                      onChange={e => setRepetirSenha(e.target.value)}
                      required
                    />
                    <button type="button" tabIndex={-1} onClick={() => setShowRepetirSenha(!showRepetirSenha)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300 focus:outline-none"
                      aria-label={showRepetirSenha ? "Ocultar senha" : "Exibir senha"}>
                      {showRepetirSenha ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.952 6.108 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.02M6.53 6.53A6.75 6.75 0 0 1 12 5.25c3.642 0 7.714 2.798 9.75 6.75a10.478 10.478 0 0 1-2.042 2.727M6.53 6.53l10.94 10.94M6.53 6.53A10.478 10.478 0 0 0 2.25 12c.457.887 1.05 1.72 1.73 2.477m2.55-2.55l10.94 10.94" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c2.036-3.952 6.108-6.75 9.75-6.75s7.714 2.798 9.75 6.75c-2.036 3.952-6.108 6.75-9.75 6.75S4.286 15.952 2.25 12z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-gradient-to-r from-[#845bdf] to-[#5ce1e6] hover:from-[#6b46c1] hover:to-[#3bc9db] focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold rounded-lg text-base px-5 py-3 text-center shadow-lg transition-all duration-300 dark:from-[#845bdf] dark:to-[#232946] dark:hover:from-[#6b46c1] dark:hover:to-[#121212] dark:focus:ring-purple-800">
                  Alterar senha
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
