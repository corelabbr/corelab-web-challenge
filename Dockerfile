# ===== Estágio 1: Builder =====
# Usa a imagem Node.js 22 para construir a aplicação
FROM node:22-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de gerenciamento de pacotes
COPY package*.json ./

# Instala TODAS as dependências (incluindo devDependencies)
RUN npm install

# Copia o restante do código-fonte da aplicação
COPY . .

# Passa variáveis de build para o Next (avaliadas em build time)
ARG API_ORIGIN
ARG NEXT_PUBLIC_API_URL
ENV API_ORIGIN=${API_ORIGIN}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Executa o build da aplicação. O Tailwind CSS será gerado aqui.
RUN npm run build

# ===== Estágio 2: Runner =====
# Usa uma imagem limpa do Node.js 22 para a produção
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Cria um usuário com menos privilégios por segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia apenas o necessário para rodar a aplicação em produção
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copia os artefatos da build (incluindo o CSS gerado)
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Instala SOMENTE as dependências de produção
RUN npm install --omit=dev

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Comando para iniciar o servidor do Next.js
CMD ["npm", "start"]
