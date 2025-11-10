<h1>Corelab Web Challenge</h1>

Para o frontend de minha aplicação decidi seguir a estrutura de origem do projeto. Como já estava tudo organizado me preocupei apenas com o deseolvimento e estrutura da página.

No desenvolvimento do front utilizei apenas Typescript, SCSS e react. 

Tive uma grande dificuldade no começo pois minha experiência com o frontend é bem inferior ao backend.

Dentro de 2 dias já tinha uma base da estrutura montada para uma tela, depois de vários bugs pois tive de aprender a utilizar o SCSS. Depois de montar uma base da tela meu foco foi em implementar as operações da api. 

Depois de terminar uma tela e desenolver todas operações de crud, tudo que faltou foi fazer a responsividade em outros dispositivos.

Acredito que o resultado foi satisfatório, abaixo está as instruções de instalação do projeto localmente.

<hr>

Para rodar o projeto terá de ter o <code>node versão ^16.15.0</code> bem como o <code>npm versão ^8.5.5</code> em sua máquina.

Abre o terminal em uma pasta de sua escolha digite o seguinte comando: <code>git clone https://github.com/rodi38/corelab-web-challenge.git</code> ou baixe o arquivo em zip e extraia-o caso não tenha o git.

Entre na raiz do projeto e digite o seguinte comando: <code>npm install</code>

Ainda na raiz do projeto crie um arquivo chamado <code>.env</code> e adicione os seguintes valores dentro: 

```
  REACT_APP_API_URL_LOCAL=http://localhost:5000
```
Agora abra o seguinte diretório: <code>src/lib/api.ts</code>

Mude o valor da variável API de <code>process.env.REACT_APP_API_URL_PRODUCTION</code> para <code>process.env.REACT_APP_API_URL_PRODUCTION</code>

Feito isso, basta ir no terminal novamente e rodar o seguinte comando: <code>npm start</code>

Pronto, o ambiente está rodando localmente. Basta abrir o seguinte link no seu navegador: http://localhost:3000/

Para iniciar sua api siga o tutorial em: https://github.com/rodi38/corelab-api-challenge/blob/main/PULL_REQUEST.md
