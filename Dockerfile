FROM node:latest

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN chmod u+x ./run.sh

ENTRYPOINT [ "sh", "run.sh" ]