FROM node:11.1.0-alpine

EXPOSE 8080

USER node

RUN mkdir /home/node/app
WORKDIR /home/node/app

RUN mkdir src
COPY src ./src
COPY tools ./tools

COPY .env ./.env
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY tsconfig.json ./tsconfig.json
RUN rm -rf node_modules
RUN npm install

RUN npm run build

CMD ["node", "./build/server.js"]
