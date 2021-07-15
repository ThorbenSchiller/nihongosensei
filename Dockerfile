FROM node:16-alpine

WORKDIR /usr/app

COPY . /usr/app/

RUN npm install --silent --production --ignore-scripts

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

EXPOSE 3000

CMD ["npm", "start"]
