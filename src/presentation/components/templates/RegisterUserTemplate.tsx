import { Github, Linkedin, Moon, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

import logoLight from '../../assets/logo-light.svg'
import { Separator } from '../ui/separator'

import type { ReactNode } from 'react'

interface IRegisterUserTemplate {
  children: ReactNode
}

export const RegisterUserTemplate: React.FC<IRegisterUserTemplate> = ({
  children,
}) => (
  <main className="register-page min-h-screen bg-[#0b1016] text-white flex flex-col">
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-10 lg:px-14">
      <Link to="/" className="flex items-center gap-3">
        <img src={logoLight} alt="Mind Blog" className="h-9 w-auto" />
      </Link>

      <nav className="flex items-center gap-6 text-sm text-white">
        <Link className="text-white transition-colors hover:text-white" to="/">
          Home
        </Link>
        <Link
          className="text-white transition-colors hover:text-white"
          to="/articles"
        >
          Artigos
        </Link>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white">
          <Moon className="h-4 w-4 text-white" aria-hidden="true" />
        </span>
      </nav>
    </header>

    <section className="flex flex-1 items-center justify-center px-4 py-12 md:px-6 lg:px-8">
      <div className="w-full max-w-[420px] text-center">
        <img src={logoLight} alt="Mind Blog" className="mx-auto h-11 w-auto" />
        <h1 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
          Criar Conta
        </h1>
        <p className="mt-3 text-sm text-white">Inovação ao seu alcance</p>

        <div className="mt-8 border border-white/10 bg-white/[0.03] p-5 text-left shadow-2xl shadow-black/30 backdrop-blur-sm md:p-6">
          <p className="mb-6 text-sm text-white">
            Preencha seus dados para começar a compartilhar artigos.
          </p>

          {children}

          <Separator className="my-8 bg-white/10" />

          <Link
            className="block text-center text-sm text-white transition-colors hover:text-white"
            to="/login"
          >
            Já tem cadastro? Clique aqui
          </Link>
        </div>
      </div>
    </section>

    <footer className="border-t border-white/10 px-6 py-8 md:px-10 lg:px-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs">
          <img src={logoLight} alt="Mind Blog" className="h-9 w-auto" />
          <p className="mt-3 text-sm leading-6 text-white">
            Seu portal de tecnologia com artigos, tutoriais e novidades do mundo
            tech.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div>
            <h2 className="text-sm font-semibold text-white">Navegação</h2>
            <ul className="mt-3 space-y-2 text-sm text-white">
              <li>
                <Link
                  className="text-white transition-colors hover:text-white"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-white transition-colors hover:text-white"
                  to="/articles"
                >
                  Artigos
                </Link>
              </li>
              <li>
                <Link
                  className="text-white transition-colors hover:text-white"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Redes Sociais</h2>
            <div className="mt-3 flex items-center gap-3 text-white">
              <a
                href="#"
                className="text-white transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </a>
              <a
                href="#"
                className="text-white transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 text-white" />
              </a>
              <a
                href="#"
                className="text-white transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white">
        © 2025 TechBlog. Todos os direitos reservados.
      </div>
    </footer>
  </main>
)
