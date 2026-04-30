# Estágio 1: Instalação de dependências
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Estágio 2: Build da aplicação
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Estágio 3: Execução (Runner)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Criar usuário sem privilégios por segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários do build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]


# FROM node:25-alpine AS builder
# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# FROM node:25-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV=production

# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next ./next
# COPY --from=builder /app/public ./public

# EXPOSE 3000

# CMD [ "npm", "start" ]

