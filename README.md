# Mind Blog Frontend

Projeto desenvolvido como parte de um teste técnico para uma vaga de estágio como desenvolvedor fullstack na MindGroup.

# Principais Bibliotecas

* Vite
* TanStackQuery
* ShadCN
* Zustand
* Tailwind
* React Router DOM

# Estrutura do Projeto

```
src
├── data
├── domain
├── infra
├── main
├── presentation

```
* **Data**: Repositórios, APIs e manipulação de dados.
* **Domain**: Lógica de negócio e casos de uso.
* **Infra**: Serviços externos e integrações com terceiros.
* **Main**: Inicialização e configuração do projeto.
* **Presentation**: Responsável por lidar com a interface com o usuário na aplicação frontend.
    * Inclui componentes de UI, páginas, rotas, estado de tela e interações do usuário.

# Instruções
## Rodar o projeto
Nesse exemplo utilizo o pnpm, porém pode ser utilizado o npm ou yarn para instalação e rodar o projeto
* Primeiro instale as dependências com o pnpm: `pnpm i`
* Crie um arquivo `.env.local` na raiz do projeto e copie as variáveis de ambiente do arquivo `.env.example`
* Rode o projeto com `pnpm dev` e acesse `http://localhost:5173`

## Atualizar pacotes
Para fim de manutenibilidade o projeto conta com alguns scripts para verificar e atualizar os pacotes
* Antes de tudo instale o [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) globalmente com `pnpm i -g npm-check-updates`
* Se quiser apenas verificar as atualizações: `pnpm run check`
* Para atualizar todos os pacotes: `pnpm run check:update`
* O modo interativo permite selecionar os pacotes que quer atualizar: `pnpm run check:interactive`

# Links

- Frontend (deploy): https://mind-blog-frontend.vercel.app/
- Backend Swagger: https://mind-blog-api.onrender.com/api/docs