
FROM node:20.18.0-alpine3.20

WORKDIR /app/my-blog

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run generate && npm run start:dev