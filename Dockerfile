#build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#staging and production
FROM nginx:stable-alpine AS production

RUN rm -rf /usr/share/nginx/html/

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"] 

