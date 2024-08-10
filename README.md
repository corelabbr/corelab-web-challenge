# Corelab WEB Challenge

Abaixo segue algumas decisões que tomei e funcionalidades da WEB.

Link do repositorio de front end

- https://github.com/matheusnff85/corelab-web-challenge

Link abaixo para o vídeo demonstrando e explicando sobre o app

- https://www.youtube.com/watch?v=cSbDV5AMkCE

## Stacks utilizadas

- **Next.js:** Framework React para desenvolvimento de aplicações web com renderização do lado do servidor e geração de sites estáticos.
- **TypeScript:** Linguagem de programação baseada em JavaScript com tipagem estática.
- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios:** Biblioteca para fazer requisições HTTP em JavaScript.
- **Zustand:** Biblioteca de gerenciamento de estado para aplicações React.
- **ESLint:** Ferramenta de linting para identificar e corrigir problemas de código.
- **Tailwind CSS:** Framework CSS utilitário para criar designs responsivos e personalizados.
- **Toastify:** Biblioteca para exibir notificações toast em aplicações web.
- **Lucide React:** Conjunto de ícones em React com base em Lucide.

## Decisões

- Decidi utilizar o Next.js por ser um framework que ja conheço, extremamente prático e de fácil instalação e configuração.

- Zustand para geração do estado da aplicação, principalmente para requisições ao backend.

- Tailwind por ser um framework prático e excelente fornecendo uma responsividade ótima.

- Já o resto das stacks por questões de praticidade e costume.

- Comecei o desenvolvimento de cima para baixo ou seja, começando pelo Header e preparando ja para receber funções de filtros, logo apos a criação de uma nova tarefa, e por fim o container onde ficariam as tarefas, sendo uma parte para as favoritas e outra para as comuns.

## Rodando localmente

**Clone o projeto**

```bash
  git clone git@github.com:matheusnff85/corelab-web-challenge.git
```

**Entre no diretório do projeto**

```bash
  cd corelab-web-challenge
```

**Instale as dependências**

```bash
  npm install
```

**Construa a aplicação**

```bash
npm run build
```

**Inicie a aplicação (Garanta que o backend está rodando corretamente)**

```bash
  npm run start
```

**Acesso padrão**

```bash
  http://localhost:3000/
```
