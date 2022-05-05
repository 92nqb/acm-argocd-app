# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --production

COPY . .

RUN chmod +x src/server.js

CMD [ "node", "src/server.js" ]