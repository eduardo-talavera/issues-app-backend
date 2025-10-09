# Etapa 1: build de TypeScript
FROM node:22.20.0-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Etapa 2: imagen final
FROM node:22.20.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/index.js"]
