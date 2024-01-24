FROM node:16.15-alpine

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]