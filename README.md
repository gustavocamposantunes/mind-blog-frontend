# Mind Blog Frontend

Projeto desenvolvido como parte de um teste técnico para uma vaga de estágio como desenvolvedor fullstack na MindGroup.

# Tecnologias Utilizadas

* Vite
* TanStackQuery
* ShadCN
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
* **Presentation**: Responsável por lidar com a interface com o usuário (no frontend) ou com a interface de entrada e saída de dados (no backend).

    * No frontend, inclui componentes de UI, páginas, rotas e interações com o usuário.

    * No backend, inclui controladores (controllers), validadores e formatação das respostas HTTP — basicamente, tudo que faz a "ponte" entre o usuário (ou cliente) e a lógica de negócio.

# Instruções
## Rodar o projeto
Nesse exemplo utilizo o pnpm, porém pode ser utilizado o npm ou yarn para instalação e rodar o projeto
* Primeiro instale as dependências com o pnpm``$ pnpm i``
* Crie um arquivo ``.env.local`` na raiz do projeto e copie a variável de ambiente do arquivos do ``.env.example``
* Rode o projeto com ``pnpm dev`` e verifique em ``localhost:5173``

## Atualizar pacotes
Para fim de manutenibilidade o projeto conta com alguns scripts para verificar e atualizar os pacotes
* Antes de tudo instale o [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) globalmente com ```pnpm i -g npm-check-updates```
* Se quiser apenas verificar as atualizações ``$ pnpm run check``
* Para atualizar todos os pacotes ``$ pnpm run check:update``
* O modo interativo permite selecionar os pacotes que quer atualizar ``$ pnpm run check:interactive``