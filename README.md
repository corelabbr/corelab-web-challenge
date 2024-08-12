# CoreNotes Frontend


## Deploy & Repositórios

- [Backend](https://github.com/carls-rodrigues/corelab-api-challenge)

- Em Produção --> [CoreNotes live](https://clab-web-challenge.vercel.app/)


## Setup
1. Clonar o repositório:

```bash
git clone https://github.com/carls-rodrigues/clab-web-challenge
cd clab-web-challenge
```

2. Instalar dependencias

```bash
npm install or similar
```

3. Criar um arquivo '.env.local' na pasta raíz do projeto e inserir

```bash
NEXT_PUBLIC_API="http://localhost:8080" Ou "https://corelab-api-challenge-pink.vercel.app"
```

4. Iniciar aplicação

```bash
npm run dev
```

## Table of Content:

- [Setup](#setup)
- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Screenshots](#screenshots)

## About The App
  Essa aplicação foi contruída com Next.Js e Tailwind.

### Features

- **Criar Notas:** Add nova nota.
- **Editar & Deletar Notas:** Atualzar ou remover notas como necessário, dando o total controle sobre suas notas.
- **Responsive Design:** A aplicação é completamente responsiva.
- **Persistent Storage:** As notas são armazenadas usando uma api e cada usuário só tem acesso as suas notas criadas.

## Technologies
Next.js and Tailwind

## Screenshots
[![empty-light.png](https://i.postimg.cc/sXW9DbDp/empty-light.png)](https://postimg.cc/dkqT5HC1)
[![empty-dark.png](https://i.postimg.cc/fyh735J1/empty-dark.png)](https://postimg.cc/HcB8Rw0t)
[![new-note-light.png](https://i.postimg.cc/RZ07nWZC/new-note-light.png)](https://postimg.cc/rKv0BF47)
[![new-note-dark.png](https://i.postimg.cc/rFjGm1cY/new-note-dark.png)](https://postimg.cc/6y74bG8d)
[![new-note-created-light.png](https://i.postimg.cc/3xbgj3kX/new-note-created-light.png)](https://postimg.cc/sM7Qsd9x)
[![new-note-created-dark.png](https://i.postimg.cc/BQ4c4YWK/new-note-created-dark.png)](https://postimg.cc/hhZ700tD)
[![edit-note-text.png](https://i.postimg.cc/tJt3FP6J/edit-note-text.png)](https://postimg.cc/SYRYhnDb)
[![edit-color.png](https://i.postimg.cc/nrzm95nR/edit-color.png)](https://postimg.cc/Q92CRf91)
[![deleted-note.png](https://i.postimg.cc/kgMcFjfm/deleted-note.png)](https://postimg.cc/xc7M93wx)
