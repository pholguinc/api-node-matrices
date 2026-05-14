# Base stage for dependencies
FROM oven/bun:1.1 as base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

FROM base as development
COPY . .

CMD ["bun", "run", "dev"]

FROM base as build
COPY . .

FROM oven/bun:1.1-slim as production
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "src/server.ts"]
