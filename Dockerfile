FROM node:16 AS build-step

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx
COPY nginx/conf.d/server.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /build/build /usr/share/nginx/html
EXPOSE 80
