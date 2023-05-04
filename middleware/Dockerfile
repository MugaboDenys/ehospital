FROM node:12-alpine3.14

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5500

CMD [ "npm", "run", "dev" ]
