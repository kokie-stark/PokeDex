FROM node:22-slim AS build
WORKDIR /app
RUN corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api ./apps/api
RUN pnpm install --frozen-lockfile --filter @pokedex/api...
RUN pnpm --filter @pokedex/api build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/apps/api/node_modules ./node_modules
COPY --from=build /app/apps/api/package.json ./package.json
EXPOSE 8080
CMD ["node", "dist/index.js"]
