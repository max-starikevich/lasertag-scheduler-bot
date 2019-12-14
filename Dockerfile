#### TYPESCRIPT BUILDER IMAGE
FROM node:12.13.1-alpine as ts-builder
LABEL maintainer="maxim.starikevich@gmail.com"

USER node
ENV PATH="/home/node/app/node_modules/.bin:${PATH}"
ENV NODE_ENV=development

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install

COPY tsconfig.json ./
COPY ./src ./src

RUN tsc

#### SERVER RUNTIME IMAGE
FROM node:12.13.1-alpine as runtime
LABEL maintainer="maxim.starikevich@gmail.com"

USER node
ENV PATH="/home/node/app/node_modules/.bin:${PATH}"
ENV NODE_ENV=production

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install

COPY --from=ts-builder /home/node/app/build build

CMD ["node", "./build/server.js"]