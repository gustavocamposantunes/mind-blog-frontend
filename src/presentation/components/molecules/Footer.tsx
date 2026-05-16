import { Github, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BrandLogo } from '../atoms'

export const Footer: React.FC = () => {
  return (
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
                  to="/profile"
                >
                  Perfil
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
                className="border-0 bg-transparent p-0 text-white transition-colors hover:text-white/80"
                aria-label="LinkedIn"
                style={{ backgroundColor: 'transparent' }}
              >
                <Linkedin className="h-4 w-4 text-current" />
              </button>
              <button
                type="button"
                className="border-0 bg-transparent p-0 text-white transition-colors hover:text-white/80"
                aria-label="GitHub"
                style={{ backgroundColor: 'transparent' }}
              >
                <Github className="h-4 w-4 text-current" />
              </button>
              <button
                type="button"
                className="border-0 bg-transparent p-0 text-white transition-colors hover:text-white/80"
                aria-label="Twitter"
                style={{ backgroundColor: 'transparent' }}
              >
                <Twitter className="h-4 w-4 text-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-8 text-center text-sm text-foreground/60">
        <p>&copy; 2025 Mind Blog. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
