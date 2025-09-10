# Pull Request - Teste Técnico Todo List

## 👨‍💻 Candidato: Arthur Aguiar

## 📋 Visão Geral da Implementação

Desenvolvi um sistema completo de gerenciamento de tarefas seguindo rigorosamente os requisitos solicitados, com frontend em React + TypeScript e backend em Node.js + Express + MongoDB.

## 🎯 Requisitos Atendidos

### ✅ Funcionalidades Obrigatórias

- [x] **CRUD Completo**: Create, Read, Update e Delete de tarefas via API
- [x] **Sistema de Favoritos**: Marcar/desmarcar items como favoritos
- [x] **Sistema de Cores**: Definição de cor para cada tarefa (sistema de prioridades 0-5)
- [x] **Filtros**: Filtragem por favoritos e por cor/prioridade
- [x] **Ordenação**: Items favoritos sempre no topo da lista
- [x] **Design Responsivo**: Layout adaptado para desktop e mobile

## 🛠️ Decisões Técnicas e Justificativas

### Escolha do Stack

- **Express no Backend**: Escolhi por familiaridade e por ser robusto o suficiente para os requisitos, permitindo desenvolvimento ágil
- **MongoDB**: Optei por NoSQL pela flexibilidade que oferece para evoluir o schema da aplicação, que é algo comum em sistemas de todo list onde novos campos podem ser adicionados frequentemente
- **TypeScript em Ambos**: Para maior confiabilidade e manutenibilidade do código
- **CSS Puro**: Decidi não utilizar frameworks de estilização (como Bootstrap) para demonstrar domínio de CSS vanilla, porém reconheço que esta escolha tornou o CSS mais complexo e demandou mais tempo

### Abordagem de Desenvolvimento

- **Otimistic Updates**: Implementei atualizações otimistas no frontend - quando o usuário realiza uma ação (como favoritar), a UI atualiza instantaneamente antes mesmo da confirmação do backend, melhorando a percepção de performance
- **Sem Paginação**: Não implementei paginação pois considerei que a quantidade de tarefas em um todo list pessoal não justificaria a complexidade adicional neste MVP

## ⚡ Abordagem Mobile First

Adotei a estratégia **Mobile First** como solicitado:

### Implementação Responsiva

- **Breakpoints Progressivos**:
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
- **CSS Grid Adaptativo**: Layout que se ajusta automaticamente
- **Touch-friendly**: Botões e elementos com tamanho adequado para mobile

## 🎨 Qualidade do Código - Desafios e Aprendizados

### Lições com CSS

O CSS tornou-se mais complexo do que o esperado. Reconheço que:

- Um framework de estilização teria acelerado o desenvolvimento
- A manutenibilidade poderia ser melhor com CSS-in-JS ou pré-processadores
- Esta foi uma valiosa lição sobre trade-offs entre controle total e velocidade

### Princípios Aplicados

- **Separation of Concerns**: Backend, frontend e estilos bem separados
- **Type Safety**: TypeScript em todo o projeto para evitar erros
- **Error Handling**: Tratamento robusto de erros em operações assíncronas

## 📊 Performance e Otimizações

### Abordagem Otimista

Implementei **optimistic updates** para melhorar a experiência do usuário:

- Ações como favoritar/desfavoritar e marcar como concluído atualizam a UI instantaneamente
- Em caso de erro, a UI reverte o estado e mostra feedback apropriado
- Esta abordagem torna a aplicação mais responsiva

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

- Node.js 16+ instalado
- MongoDB (local ou Atlas)
- Git

### 1. Clone e Setup do Backend

```bash
# Clone o repositório
git clone [URL_DO_BACKEND]
cd TodoListBackend

# Instale dependências
npm install

# Configure environment variables
echo "MONGO_URI=mongodb://localhost:27017/todoapp" > .env
echo "PORT=3000" >> .env

# Inicie o servidor
node server.js
2. Clone e Setup do Frontend
bash
# Em outro terminal, clone o frontend
git clone [URL_DO_FRONTEND]
cd TodoListFrontEnd

# Instale dependências
npm install

# Inicie o frontend
npm run dev
3. Configure o MongoDB
Opção 1 - MongoDB Local (Recomendado para teste):

bash
# Certifique-se que o MongoDB está rodando
sudo systemctl start mongod
Opção 2 - MongoDB Atlas (Cloud):

Edite o arquivo .env do backend com sua connection string:

text
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/todoapp
✅ Verificação
Acesse http://localhost:5173 e você deverá ver a aplicação funcionando!

📈 Lições Aprendidas
Trade-offs de CSS: O controle total do CSS vanilla tem custo em complexidade e tempo

MongoDB Flexibilidade: NoSQL foi vantajoso para prototipagem rápida

Otimistic Updates: Melhoram significativamente a percepção de performance

Mobile First: Requer planeamento antecipado mas resulta em melhor experiência mobile

🎯 Melhorias Futuras
Adoção de frameworks para simplificar estilização

Testes automatizados

Paginação para quando a lista de tarefas crescer

Deploy em cloud com CI/CD
```
