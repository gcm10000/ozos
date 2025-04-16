# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todos os arquivos do projeto
COPY . .

# ✅ Define a variável diretamente no momento do build (para uso no frontend)
ENV NEXT_PUBLIC_API_BASE_URL=https://api.ozos.com.br/api/v1
ENV NEXT_PUBLIC_API_URL=https://api.ozos.com.br

# Gera a build com a variável já disponível
RUN npm run build --no-lint

# Etapa 2: Runtime
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=https://api.ozos.com.br/api/v1
ENV NEXT_PUBLIC_API_URL=https://api.ozos.com.br

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
