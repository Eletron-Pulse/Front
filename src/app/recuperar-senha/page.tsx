"use client"
import { useState } from "react"
import { toast } from "sonner"

export default function RecuperarSenha() {
  const [email, setEmail] = useState("")
  const [codigo, setCodigo] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [repetirSenha, setRepetirSenha] = useState("")
  const [etapa, setEtapa] = useState<"solicitar" | "alterar">("solicitar")

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
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Recuperar Senha
        </h1>
        {etapa === "solicitar" ? (
          <form onSubmit={solicitarCodigo} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail cadastrado</label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf]"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full text-white bg-[#845bdf] hover:bg-[#6b46c1] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#845bdf] dark:hover:bg-[#6b46c1] dark:focus:ring-purple-800">
              Solicitar código
            </button>
          </form>
        ) : (
          <form onSubmit={alterarSenha} className="space-y-4">
            <div>
              <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código de recuperação</label>
              <input
                type="text"
                id="codigo"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf]"
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="novaSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nova senha</label>
              <input
                type="password"
                id="novaSenha"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf]"
                value={novaSenha}
                onChange={e => setNovaSenha(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="repetirSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir nova senha</label>
              <input
                type="password"
                id="repetirSenha"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf]"
                value={repetirSenha}
                onChange={e => setRepetirSenha(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full text-white bg-[#845bdf] hover:bg-[#6b46c1] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#845bdf] dark:hover:bg-[#6b46c1] dark:focus:ring-purple-800">
              Alterar senha
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
