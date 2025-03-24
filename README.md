# Todo List App

Uma aplicação moderna de lista de tarefas (Todo List) construída com Next.js 15.2.3, TypeScript e SASS. O projeto foi desenvolvido com foco em boas práticas e uma experiência de usuário intuitiva.

## 💡 Sobre a Aplicação

### Frontend
- **Componentes Reutilizáveis**: Desenvolvidos de forma modular para máxima reusabilidade
- **Estilização**: Utiliza SASS para uma estilização organizada e manutenível
- **Estado Global**: Gerenciamento eficiente de estado para todas as tarefas
- **Responsividade**: Interface adaptável para diferentes tamanhos de tela
- **Acessibilidade**: Implementação seguindo as melhores práticas de a11y

## 🚀 Funcionalidades

- ✅ **Gerenciamento de Tarefas**
  - Adicionar novas tarefas
  - Editar tarefas existentes
  - Excluir tarefas
  
- ⭐ **Organização**
  - Sistema de favoritos
  - Filtros de visualização
  - Personalização de cores

## 📁 Estrutura do Projeto

```
corelab-web-challenge/
├── app/
│   ├── components/     # Componentes React reutilizáveis
│   ├── http/          # Cliente HTTP e configurações de API
│   ├── layout.tsx     # Layout principal
│   ├── page.tsx       # Página principal
│   └── globals.scss   # Estilos globais
├── public/            # Arquivos estáticos
├── Dockerfile         # Configuração Docker
├── .env.loca.explate  # Exemplo de variáveis de ambiente
└── next.config.ts     # Configuração Next.js
```

## 🛠️ Tecnologias

- **[Next.js](https://nextjs.org/)**: Framework React para aplicações web modernas
- **[TypeScript](https://www.typescriptlang.org/)**: Adiciona tipagem estática ao JavaScript
- **[SASS](https://sass-lang.com/)**: Pré-processador CSS para estilização avançada
- **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones modernos

## ⚙️ Configuração e Execução

1. Crie um arquivo `.env.local` na raiz do projeto e adicione:
```
NEXT_PUBLIC_API_URL=http://sua-api-url
```

2. Execute o projeto:
```bash
docker-compose up --build
```

3. Acesse [http://localhost:3000](http://localhost:3000) no navegador