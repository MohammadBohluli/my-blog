
FROM node:20.18.0-slim

WORKDIR /app/myBlog

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm","run", "start:dev" ]