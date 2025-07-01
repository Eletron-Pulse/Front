"use client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

interface Inputs {
  nome: string
  email: string
  senha: string
  confirmarSenha: string
}

export default function CadastrarCliente() {
  const { register, handleSubmit, reset, watch } = useForm<Inputs>()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function onSubmit(data: Inputs) {
    if (data.senha !== data.confirmarSenha) {
      toast.error("As senhas não coincidem!")
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: data.nome, email: data.email, senha: data.senha })
      })
      const resData = await response.json()
      if (response.ok) {
        toast.success(resData.mensagem || "Cadastro realizado com sucesso!")
        reset()
        setTimeout(() => router.push("/login"), 1500)
      } else {
        toast.error(resData.erro || "Erro ao cadastrar cliente")
      }
    } catch (error) {
      toast.error("Erro ao cadastrar. Tente novamente.")
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#845bdf]/30 via-[#5ce1e6]/20 to-[#232946]/40 dark:from-[#232946] dark:via-[#845bdf]/20 dark:to-[#121212] transition-colors duration-500">
      <div className="flex flex-col items-center px-6 py-8 mx-auto w-full max-w-md">
        <div className="w-full bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 backdrop-blur-md">
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white text-center mb-2">
              Crie sua conta
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Preencha os dados para se cadastrar</p>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                <input type="text" id="nome"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-colors"
                  required {...register("nome")} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                <input type="email" id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-colors"
                  required {...register("email")} />
              </div>
              <div>
                <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} id="senha"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 pr-10 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-colors"
                    required {...register("senha")} />
                  <button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300 focus:outline-none"
                    aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}>
                    {showPassword ? (
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
                <label htmlFor="confirmarSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Senha</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} id="confirmarSenha"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#845bdf] focus:border-[#845bdf] block w-full p-2.5 pr-10 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#845bdf] dark:focus:border-[#845bdf] transition-colors"
                    required {...register("confirmarSenha")} />
                  <button type="button" tabIndex={-1} onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300 focus:outline-none"
                    aria-label={showConfirmPassword ? "Ocultar senha" : "Exibir senha"}>
                    {showConfirmPassword ? (
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
                Cadastrar
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Já possui conta? <a href="/login" className="font-medium text-[#845bdf] hover:underline dark:text-[#5ce1e6]">Entrar</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
