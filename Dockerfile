FROM node:18-slim

WORKDIR /usr/src/app

COPY . .

CMD ["sh", "-c","npm install && npm start"]