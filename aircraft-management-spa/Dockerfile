FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

RUN sed -i 's|location / {|location / { try_files $uri $uri/ /index.html;|' /etc/nginx/conf.d/default.conf

EXPOSE 80