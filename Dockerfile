#### TYPESCRIPT BUILDER IMAGE
FROM node:12.14-alpine as ts-builder
LABEL maintainer="maxim.starikevich@gmail.com"

USER node
ENV PATH="/home/node/app/node_modules/.bin:${PATH}"
ENV NODE_ENV=development

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock ./

# installing "dependencies" + "devDependencies" (see NODE_ENV)
RUN yarn install

COPY tsconfig.json ./
COPY ./src ./src

RUN tsc

#### SERVER RUNTIME IMAGE
FROM node:12.14-alpine as runtime
LABEL maintainer="maxim.starikevich@gmail.com"

USER node
ENV PATH="/home/node/app/node_modules/.bin:${PATH}"
ENV NODE_ENV=production

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock ./

# installing only "dependencies" (run-time packages, see NODE_ENV)
RUN yarn install

COPY --from=ts-builder /home/node/app/build build

CMD ["node", "./build/server.js"]