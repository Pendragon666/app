FROM node:14

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
ENV MONGO=mongodb://root:Zg134yi#e0p0s@mongo:27017/pendragon?authSource=admin

RUN yarn build

EXPOSE 5000
CMD ["node", "dist/app.js"]