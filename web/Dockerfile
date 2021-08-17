FROM node:14 AS builder
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./ .
RUN apt-get update -y && apt-get upgrade -y
RUN yarn install && yarn build

 
FROM nginx

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build ./


# /usr/share/nginx/webapp