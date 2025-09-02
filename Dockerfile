FROM node:lts-alpine AS base
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm prune --omit=dev

ENV NODE_ENV=production
EXPOSE 8080
CMD [ "node", "app.js" ]