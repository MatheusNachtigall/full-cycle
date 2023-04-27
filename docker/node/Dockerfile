FROM node:15

WORKDIR /usr/src/app

COPY . .

RUN ["npm", "install", "express"]
RUN ["npm", "install", "mysql", "--save"]

EXPOSE 3000
