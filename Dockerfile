#build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#production
FROM nginx:stable-alpine AS production
COPY /dist /usr/share/nginx/html
EXPOSE 80
CMD

