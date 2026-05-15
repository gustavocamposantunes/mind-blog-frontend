import { Github, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BrandLogo, ThemeToggle } from '../atoms'
import { Separator } from '../ui/separator'

import type { ReactNode } from 'react'

interface ILoginTemplate {
  children: ReactNode
}

export const LoginTemplate: React.FC<ILoginTemplate> = ({ children }) => (
  <main className="login-page min-h-screen bg-background text-foreground flex flex-col transition-colors">
    <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-10 lg:px-14">
      <Link to="/" className="flex items-center gap-3">
        <BrandLogo className="items-start" />
      </Link>

      <nav className="flex items-center gap-6 text-sm text-foreground">
        <Link
          className="text-foreground transition-colors hover:text-foreground"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-foreground transition-colors hover:text-foreground"
          to="/articles"
        >
          Artigos
        </Link>
        <span>
          <ThemeToggle variant="auth" />
        </span>
      </nav>
    </header>

    <section className="flex flex-1 items-center justify-center px-4 py-12 md:px-6 lg:px-8">
      <div className="w-full max-w-[420px] text-center">
        <BrandLogo centered className="mx-auto" />
        <h1 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
          Entrar na Plataforma
        </h1>
        <p className="mt-3 text-sm text-foreground/80">
          Acesse sua conta para gerenciar seus artigos
        </p>

        <div className="mt-8 border border-border bg-card/70 p-5 text-left shadow-2xl shadow-black/10 backdrop-blur-sm md:p-6">
          {children}

          <Separator className="my-8 bg-border" />

          <Link
            className="block text-center text-sm font-semibold text-foreground transition-colors hover:text-foreground"
            to="/register"
          >
            Não tem uma conta? Criar conta
          </Link>
        </div>
      </div>
    </section>

    <footer className="border-t border-border px-6 py-8 md:px-10 lg:px-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs">
          <BrandLogo className="items-start" />
          <p className="mt-3 text-sm leading-6 text-foreground/80">
            Seu portal de tecnologia com artigos, tutoriais e novidades do mundo
            tech.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Navegação</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>
                <Link
                  className="text-foreground/80 transition-colors hover:text-foreground"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/80 transition-colors hover:text-foreground"
                  to="/articles"
                >
                  Artigos
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/80 transition-colors hover:text-foreground"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Redes Sociais
            </h2>
            <div className="mt-3 flex items-center gap-3 text-foreground">
              <button
                type="button"
                className="border-0 bg-transparent p-0 text-primary transition-colors hover:text-primary/80"
                aria-label="LinkedIn"
                style={{ backgroundColor: 'transparent' }}
              >
                <Linkedin className="h-4 w-4 text-current" />
              </button>
              <button
                type="button"
                className="border-0 bg-transparent p-0 text-primary transition-colors hover:text-primary/80"
                aria-label="GitHub"
                style={{ backgroundColor: 'transparent' }}
              >
                <Github className="h-4 w-4 text-current" />
              </button>
              <button
                type="button"
                className="border-0 bg-transparent p-0 text-primary transition-colors hover:text-primary/80"
                aria-label="Twitter"
                style={{ backgroundColor: 'transparent' }}
              >
                <Twitter className="h-4 w-4 text-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-foreground/80">
        © 2025 TechBlog. Todos os direitos reservados.
      </div>
    </footer>
  </main>
)
