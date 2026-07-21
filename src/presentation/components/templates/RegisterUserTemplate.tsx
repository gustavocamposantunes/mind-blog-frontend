import { Link } from 'react-router-dom'

import { BrandLogo } from '../atoms/BrandLogo'
import { Footer } from '../molecules/Footer'
import { Header } from '../molecules/Header'
import { Separator } from '../ui/separator'

import type { ReactNode } from 'react'

interface IRegisterUserTemplate {
  children: ReactNode
}

export const RegisterUserTemplate: React.FC<IRegisterUserTemplate> = ({
  children,
}) => (
  <main className="register-page min-h-screen bg-background text-foreground flex flex-col transition-colors">
    <Header />

    <section className="flex flex-1 items-center justify-center px-4 py-12 md:px-6 lg:px-8">
      <div className="w-full max-w-[420px] text-center">
        <BrandLogo centered className="mx-auto" />
        <h1 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
          Criar Conta
        </h1>
        <p className="mt-3 text-sm text-foreground/80">
          Inovação ao seu alcance
        </p>

        <div className="mt-8 border border-border bg-card/70 p-5 text-left shadow-2xl shadow-black/10 backdrop-blur-sm md:p-6">
          <p className="mb-6 text-sm text-foreground/80">
            Preencha seus dados para começar a compartilhar artigos.
          </p>

          {children}

          <Separator className="my-8 bg-border" />

          <Link
            className="block text-center text-sm font-semibold text-foreground transition-colors hover:text-foreground"
            to="/login"
          >
            Já tem cadastro? Clique aqui
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </main>
)
