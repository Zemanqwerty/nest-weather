FROM node:19.5.0-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install
RUN rm -r node_modules
RUN npm i --save
EXPOSE 3000:3000
COPY . .