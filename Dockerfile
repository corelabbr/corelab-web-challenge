# Estágio 1: Build
FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Estágio 2: Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
