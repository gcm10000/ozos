# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --no-lint

# Etapa 2: Runtime
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
