FROM node:14.15.3-alpine3.12 as builder

ENV NODE_ENV build

WORKDIR /app

COPY . .

RUN npm ci && npm run build

#######################################

FROM node:14.15.3-alpine3.12

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
USER node
WORKDIR /home/node/app

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/dist/ ./dist/

RUN npm ci

EXPOSE 3001

CMD ["node", "dist/main.js"]
