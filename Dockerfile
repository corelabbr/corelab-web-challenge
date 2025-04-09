FROM node:14-alpine

RUN apk update && apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

CMD ["npm", "start"]

