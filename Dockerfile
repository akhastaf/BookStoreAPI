FROM node:latest

WORKDIR /app

COPY package.json ./
COPY . .

RUN npm install -g npm@9.6.7
# RUN npm install --ignore-scripts=false --foreground-scripts --verbose sharp
RUN npm install
RUN npm install -g @nestjs/cli


ENTRYPOINT [ "npm", "run", "start:dev" ]