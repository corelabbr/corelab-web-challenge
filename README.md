# Geferson Almeida Lopes

[Linkedin](https://www.linkedin.com/in/algeferson/) |
[Github](https://github.com/GefersonLopes) | 
[Email](mailto:gefersonjefrey@gmail.com)

## Link para vídeo explicativo
[Youtube](https://youtu.be/U_D_nwJzZa0)

# Corelab Web Challenge

Este repositório contém o código do frontend (React) e backend (Nest.js) juntos para o desafio técnico.

## Pré-requisitos

Antes de começar, você precisa ter o seguinte instalado:
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/en/)

## Configuração Inicial

### Clonando o Repositório

clone o repositório e entre na pasta do projeto:

```bash
git clone git@github.com:GefersonLopes/corelab-web-challenge.git
cd corelab-web-challenge
```

## Inicializando o Projeto com Docker

Seu Docker Desktop deve estar em execução para essa ação, após verificar o Docker, execute o comando para iniciar todos os serviços do docker-compose:

```bash
docker-compose up --build
```

Este comando vai fazer a inicialização tanto do backend quanto do frontend juntos.

## Acesso aos Serviços

### Frontend

[Link para acessar o Frontend](http://localhost:3000)

### Backend

[Link para acessar o Backend](http://localhost:3001)

### Documentação da API

[Link para acessar a documentação Swagger](http://localhost:3001/docs)

## Executando Testes

Para rodar os testes no backend, dever está acessando a pasta do backend, para isso, executar os comando:

```bash
cd back
npm i
npm test

```