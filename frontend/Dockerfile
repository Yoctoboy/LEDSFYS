FROM node:16-alpine as build-step

WORKDIR /app

ENV SKIP_PREFLIGHT_CHECK true
ENV HOST 0.0.0.0
ENV PATH /src/frontend/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
COPY ./src ./src
COPY ./public ./public
RUN yarn install
RUN yarn build
