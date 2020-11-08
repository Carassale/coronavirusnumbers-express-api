FROM node:11.1.0-alpine

EXPOSE 8080

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

COPY src ./src
COPY tools ./tools

COPY tsconfig.json ./tsconfig.json
RUN npm run build

CMD ["node", "./build/server.js"]
