# erp-react-web

## Sobre o Projeto
Este é o repositório do frontend do sistema ERP, desenvolvido com React, Vite e TypeScript.

## Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/marciofrainer-design/erp-react-web.git
   ```

2. Navegue até o diretório do frontend:
   ```bash
   cd erp-react-web/frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

## Scripts Disponíveis
Aqui estão os principais comandos disponíveis no projeto:

- **Iniciar o servidor de desenvolvimento:**
  ```bash
  npm run dev
  ```
  Inicia o servidor de desenvolvimento com Vite.

- **Iniciar o servidor de desenvolvimento com mocks:**
  ```bash
  npm run dev:mock
  ```
  Inicia o servidor com dados mockados.

- **Build para produção:**
  ```bash
  npm run build
  ```
  Gera os arquivos otimizados para produção.

- **Pré-visualizar o build:**
  ```bash
  npm run preview
  ```
  Visualiza o build gerado.

- **Executar testes:**
  ```bash
  npm run test
  ```
  Executa os testes com Vitest.

- **Cobertura de testes:**
  ```bash
  npm run test:coverage
  ```
  Gera o relatório de cobertura de testes.

- **Lint do código:**
  ```bash
  npm run lint
  ```
  Verifica problemas de lint no código.

## Adicionando Componentes do shadcn
Para adicionar novos componentes utilizando o shadcn, siga os passos abaixo:

1. Execute o comando para adicionar um componente:
   ```bash
   npx shadcn add [componente]
   ```
   Substitua `[componente]` pelo nome do componente desejado.

2. Certifique-se de que o Tailwind CSS está configurado corretamente no projeto.

## Tecnologias Utilizadas
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Query
- i18next

## Estrutura do Projeto
A estrutura do projeto segue o padrão:
```
frontend/
  src/
    components/    # Componentes reutilizáveis
    pages/         # Páginas principais
    hooks/         # Hooks customizados
    context/       # Contextos globais
    utils/         # Funções utilitárias
```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença
Este projeto está licenciado sob a licença MIT.
