# 📋 Todo List - Sistema Completo de Gerenciamento de Tarefas

Sistema completo de gerenciamento de tarefas com frontend em React + TypeScript e backend em Node.js + Express + MongoDB.

## 🎯 Sobre o Projeto

Este é um sistema completo para gerenciamento de tarefas pessoais ou em equipe. Com interface moderna e intuitiva, permite criar, organizar e priorizar tarefas de forma eficiente.

### ✨ Funcionalidades Principais

**Frontend:**

- ✅ Interface moderna e responsiva
- ✅ Criação de tarefas com nome, prioridade e favoritos
- ✅ Visualização em grid de todas as tarefas
- ✅ Filtros por favoritos e prioridade
- ✅ Modal de edição completa
- ✅ Marcar/desmarcar como concluído
- ✅ Design system com cores para prioridades
- ✅ Totalmente acessível e responsivo

**Backend:**

- ✅ API RESTful completa
- ✅ CRUD de tarefas
- ✅ Banco de dados MongoDB
- ✅ Validação de dados
- ✅ CORS configurado
- ✅ Middleware automático para datas de conclusão

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Axios** para consumo de API
- **CSS Modules** com variáveis CSS
- **HTML5** semântico e acessível

### Backend

- **Node.js** com Express.js
- **MongoDB** avec Mongoose ODM
- **CORS** pour cross-origin requests
- **Dotenv** pour variáveis de ambiente

## 🚀 Como Rodar o Projeto Completo

### Pré-requisitos

- Node.js 16+ instalado
- MongoDB (local ou Atlas)
- Git
- npm ou yarn

### 1. Clone os Repositórios

```bash
# Frontend
git clone https://github.com/Art109/TodoListFrontEnd

# Backend (em outro terminal)
git clone https://github.com/Art109/TodoListBackend


2. Configuração do Backend
bash
# Entre na pasta do backend

# Instale as dependências
npm install

# Crie um arquivo .env

# Edite o arquivo .env com suas credenciais do MongoDB


3. Configuração do MongoDB
Escolha uma das opções abaixo:

🔹 Opção 1: MongoDB Local (Recomendado para desenvolvimento)
bash
# Instale o MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Use no .env:
MONGO_URI=mongodb://localhost:27017/todoapp

🔹 Opção 2: MongoDB Atlas (Cloud - Production)
Crie conta em MongoDB Atlas

Crie um cluster gratuito (Free Tier)

Configure acesso:

Database Access → Add New User

Network Access → Add IP Address (0.0.0.0/0 para qualquer IP)

Obtenha a connection string e use no .env


4. Inicie o Backend
bash
# Com o .env configurado, inicie o servidor
node server.js
O backend estará rodando em: http://localhost:3000

5. Configuração do Frontend
bash
# Entre na pasta do frontend

# Instale as dependências
npm install

# Inicie o front
npm run dev
O frontend estará rodando em: http://localhost:5173

🎨 Sistema de Prioridades
Cada prioridade tem cor e significado específico:

Nível	Cor	Significado
0	Cinza	Nenhuma prioridade
1	Azul	Baixa prioridade (Estudo)
2	Verde	Média prioridade (Trabalho)
3	Laranja	Alta prioridade (Pessoal)
4	Vermelho	Urgente (Saúde)
5	Rosa	Crítica (Reunião)

📱 Responsividade
O sistema é totalmente responsivo:

Mobile (320px+): Layout single column

Tablet (768px+): Grid 2 colunas

Desktop (1024px+): Grid 3 colunas

🔌 API Endpoints
Método	Endpoint	Descrição
GET	/tasks	Lista todas as tarefas
POST	/tasks	Cria uma nova tarefa
GET	/tasks/:id	Busca tarefa por ID
PUT	/tasks/:id	Atualiza tarefa
DELETE	/tasks/:id	Remove tarefa

🔧 Variáveis de Ambiente
Backend (.env)
env
MONGO_URI=sua_string_de_conexao_mongodb
PORT=3000


🐛 Solução de Problemas Comuns
Erro de Conexão com MongoDB
bash
# Verifique se o MongoDB está rodando
sudo systemctl start mongod

# Ou use MongoDB Atlas com string de conexão correta
Erro de CORS
Verifique se o backend está rodando na porta 3000

Confirme se o frontend está apontando para a URL correta

Portas Ocupadas
bash
# Matar processo na porta 3000
npx kill-port 3000

# Matar processo na porta 5173
npx kill-port 5173

📋 Próximas Melhorias
Retafotaração da estilização

Autenticação de usuários

Categorias personalizadas

Lembretes e notificações

Upload de anexos

Modo escuro

Exportação de dados

Testes automatizados

Deploy em nuvem

👨‍💻 Autor
Arthur Aguiar - arthur.espinaguiar@gmail.com

GitHub: @Art109

LinkedIn: Arthur Aguiar
```
