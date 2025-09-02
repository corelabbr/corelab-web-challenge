# Desafio Corelab - Solução

Esta PR contém a solução do desafio para a vaga de Dev Full-stack da Corelab, seguindo os requisitos solicitados para o desenvolvimento de uma aplicação full-stack de anotações.

### Features

- [x] Criptografia: Os dados sensíveis do usuário e o conteúdo das notas é inteiramente criptografado através de criptografia AES-256 utilizando a lib `crypto` do Node.js. Sempre que um dado é solicitado, ele é descriptografado em tempo real, garantindo a segurança das informações, e é sempre criptografado ao ser salvo no banco de dados;
- [x] Autenticação JWT + Middleware: A API conta com autenticação utilizando a lib `JWT`, que gera tokens baseados em dados do próprio usuário. Os UseCases de cada implementação garantem que somente o usuário dono daquele item possa acessá-lo, e respostas negativas da API são dadas em caso de tentativa de trazer dados indevidos.
- [x] Documentação no Swagger: A API conta com uma documentação utilizando a lib Swagger, que utiliza as tipagens montadas com as libs `zod` e `nestjs-zod` para documentar cada tipo de informação esperada em cada endpoint, e o objeto retornado nos casos bem e mau-sucedidos;
- [x] Implementação de ID aleatório no banco de dados: a API gera IDs únicos e aleatórios para cada entidade, não sendo gerado um ID numérico crescente, de modo que os dados sejam mais protegidos e que não sejam facilmente buscados por qualquer pessoa, sendo necessário saber o ID randômico para buscar um item pelo ID;
- [x] Testes Unitários: A aplicação possua uma cobertura de aproximadamente 50% de suas implementações utilizando as libs `Jest` e `Supertest` (esta última para testar os métodos dos controllers da aplicação);
- [x] Clean Architecture: A API está desenvolvida seguindo princípios de Clean Architecture, utilizando uma arquitetura modular de estilo cebola, de modo a evitar que itens de diferentes entidades sistêmicas estejam misturados entre si em pastas;
- [x] Caching: A API utiliza caching através das libs `cache-manager` e `@nestjs/cache-manager`, utilizando um banco de dados Redis em ambiente local ou de produção para armazenar alguns dados de forma a evitar stress na aplicação por muitas requisições;

### Tecnologias Utilizadas

#### Back-end:

- ORM: Prisma + Typescript;
- Banco de dados: MySQL;
- Framework: NestJS + Express;
- Caching: Redis + KeyV + Cache-Manager + Docker (ver abaixo);
- Documentação da API: Swagger;
- Testes: Jest + Supertest;
- Autenticação: JWT

#### Front-end:

- Framework: NextJS + Typescript;
- Estilização: SASS;
- Tipagens: Zod + TypeScript;
- Requisições/Integração: Axios;

### Rodando a aplicação

#### Rodando - clonagem + configuração das variáveis de ambiente

Efetue a clonagem dos dois repositórios, front-end e back-end em uma única pasta, de modo a manter a estrutura mais limpa.

Na pasta do back-end, crie um arquivo `.env` com as variáveis de ambiente necessárias (veja o arquivo `.env.example` para referência).

Para o app rodar corretamente, é necessário gerar duas chaves de criptografia para o AES-256 e inseri-las como as variáveis `CRYPTO_SECRET` e `CRYPTO_IV`. [Neste link](https://acte.ltd/utils/randomkeygen) é possível gerá-las de modo randômico. Após gerá-las, coloque a "Basic 16" na variável `CRYPTO_IV` e a "Encryption key 256" na variável `CRYPTO_SECRET`.

Para rodar o Cache com o Redis, é preciso gerar um container via Docker ou utilizar um banco da própria Redis Cloud. Caso deseje utilizar via Docker Desktop, copie o comando abaixo para a criação de um novo container:

```
docker run --hostname=ff67fd77cb8d --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=REDISBLOOM_ARGS= --env=REDISEARCH_ARGS= --env=REDISJSON_ARGS= --env=REDISTIMESERIES_ARGS= --env=REDIS_ARGS= --network=bridge -p 6379:6379 -p 8001:8001 --restart=no --label='desktop.docker.io/wsl-distro=Ubuntu' --label='org.opencontainers.image.ref.name=ubuntu' --label='org.opencontainers.image.version=22.04' --runtime=runc -d redis/redis-stack:latest
```

Por padrão, o banco ficará como o host `localhost` e a porta `6379`, e somente isso é necessário para poder rodar ele com o caching local. Caso deseje utilizar um banco de dados Redis em produção, será necessário alterar as variáveis de ambiente `REDIS_PRODUCTION_HOST`, `REDIS_PRODUCTION_PORT`, `REDIS_PRODUCTION_USER` e `REDIS_PRODUCTION_PASSWORD` no arquivo `.env` com os dados fornecidos pela Redis Cloud ou outro provedor do banco.

O Container do Redis vem junto com o Redis-Insight, que permite visualizar os dados armazenados no cache da aplicação. Para acessá-lo, basta abrir o navegador e ir até a URL `http://localhost:8001`.

A aplicação depende de pelo menos um banco de dados MySQL para ser rodada. Para isso, basta utilizar o Shell do MySQL ou um cliente de banco de dados para criar o banco de dados `corenotes_db`, e inserir os dados de autenticação. Após criar o banco, copie a sua string de conexão na variável `DATABASE_URL`.
Caso queira rodar os testes unitários, crie um segundo banco de dados `corenotes_db_test` e copie a sua string de conexão na variável `SHADOW_DATABASE_URL` para o Prisma poder reconhecê-lo na hora de rodar os testes dos endpoints da API.

Por fim, é necessário preencher algumas variáveis de ambiente para o Nest e os providers utilizarem. Utilize o valor "development" ou "local" para a chave `NODE_ENV`, o valor "mysql" para a chave `DATABASE_PROVIDER`, uma porta de quatro dígitos para a chave `PORT`, a url da API e do front-end nas chaves `API_URL` e `FRONTEND_URL` e a chave para a criação de JWTs na variável `APP_SECRET`. Por segurança, pode-se usar uma das chaves geradas no link acima.

Ao fim da configuração, o arquivo `.env` deve ficar parecido com o abaixo:

```
# Application Environment Variables
NODE_ENV=development
PORT=5000
API_URL="http://localhost:5000/api"
FRONTEND_URL="http://localhost:3000"
DATABASE_URL="mysql://user:password@localhost:3306/corenotes_db"
DATABASE_PROVIDER="mysql"
APP_SECRET=mycrypto

# Tests
SHADOW_DATABASE_URL="mysql://user:password@localhost:3306/corenotes_db_test"

# Cryptography Settings
CRYPTO_SECRET=obXApy1XJIL8eR5fNI40ApGYcnnZjmvO
CRYPTO_IV=wDYth95sawqDQYss

# Redis Cache Settings
REDIS_HOST=localhost
REDIS_PORT=6379

# Redis Cache Production Settings - [Parte opcional]
REDIS_PRODUCTION_HOST="redis-example.redis-cloud.com"
REDIS_PRODUCTION_PORT=13503
REDIS_PRODUCTION_USER="default"
REDIS_PRODUCTION_PASSWORD="your-password-here"
```

Por fim, no repositório do front-end, copie o arquivo `.env.example`, altere seu nome para `.env` e mude o valor da variável `NEXT_PUBLIC_API` para a URL da API montada via configuração manual ou via Docker (próximo passo).

#### Rodando com Docker

Ambos os repositórios já vêm pré-configurados com as informações do Docker que serão utilizadas para criar os containers. Para isso, basta rodar o comando `npm run docker:up` ou `docker-compose up` na root de cada um dos projetos, e os containers serão iniciados automaticamente.

(OBS: Lembre-se de que é necessário ter o Docker instalado e em execução na sua máquina.)
(OBS 2: Caso esteja utilizando Windows, o Docker pode confundir o localhost da url do banco criado em container com o localhost do seu sistema. Fechar o processo do mysql no Gerenciador de Tarefas pode ajudar a resolver esse problema.)

Por padrão, a API será aberta na porta 3311. Basta utilizar a URL `http://localhost:3311/swagger` para acessar a documentação.

#### Rodando localmente

Após a configuração, rode o comando `npm install` para instalar as dependências do projeto. Após isso, rode o comando `npx prisma migrate dev`, e insira o nome da migration para que o banco seja sincronizado com o modelo das entidades do arquivo `schema.prisma`. Após isso, rode o comando `npx prisma db seed` para rodar o seed de um usuário e três notas padrão (vê-los na pasta `./src\shared\infra\db\prisma\seeders`).
Por fim, rode o comando `npm run start:dev` para iniciar a aplicação em modo de desenvolvimento, e assim que a aplicação iniciar, é possível acessar sua documentação através da URL `http://localhost:5000/swagger`.

No repositório do front-end, rode o comando `npm install`, e em seguida `npm run dev` para iniciar a aplicação front-end.

#### Vídeo
Para assistir o vídeo mostrando a execução do projeto integrado, clique [aqui](https://drive.google.com/file/d/1OrNm63xbSP7wizEVmFbTeeTPdOwhwXQT/view?usp=sharing)!