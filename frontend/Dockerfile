FROM node:16.0.0-alpine3.12

# RUN apk add bash

USER node

WORKDIR /react-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]