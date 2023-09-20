FROM node:18-alpine

WORKDIR /usr/app

COPY public ./public
COPY package.json ./package.json

COPY .next/standalone ./
COPY .next/static ./.next/static

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

ENV HOSTNAME "0.0.0.0"

EXPOSE 3000

CMD ["node", "server.js"]
