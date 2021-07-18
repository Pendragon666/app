FROM node:14 AS builder
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./ .
RUN apt-get update -y && apt-get upgrade -y
RUN yarn install && yarn build

 
FROM nginx

WORKDIR /usr/share/nginx/
RUN rm -rf ./*
RUN mkdir webapp
COPY --from=builder /app/build ./webapp


# /usr/share/nginx/webapp