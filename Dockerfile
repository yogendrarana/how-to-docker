FROM node:20.11-alpine3.18 AS base
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM base AS development
COPY . .
CMD [ "yarn", "dev" ]

FROM base AS production
COPY . .
RUN yarn install --production
CMD [ "yarn", "start" ]