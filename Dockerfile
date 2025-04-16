# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todos os arquivos do projeto (incluindo o .env)
COPY . .

# ✅ Copia o .env.production.local explicitamente para garantir que o Next.js leia
COPY .env.production.local .env.production.local

# Roda o build do Next.js, que agora usará as variáveis do .env.production.local
RUN npm run build --no-lint

# Etapa 2: Runtime
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copia tudo do build stage
COPY --from=builder /app ./

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o app em produção
CMD ["npm", "start"]
