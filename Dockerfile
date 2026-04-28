ARG NODE_VERSION=24.13.0-slim

FROM node:${NODE_VERSION} AS dependencies
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund


FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ARG GEOPHRASE_API_KEY
ENV NEXT_PUBLIC_GEOPHRASE_API_KEY=$GEOPHRASE_API_KEY

RUN npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /app

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000
