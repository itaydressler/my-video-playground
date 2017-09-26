FROM node:8.5.0

ARG env
ENV env  $env

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn","start"]