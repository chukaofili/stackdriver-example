FROM node:12.16.2-alpine AS base
FROM base AS build

WORKDIR /www
COPY package.json yarn.lock ./
RUN yarn install

# copy node_modules from the build image
FROM base

WORKDIR /www
COPY --from=build /www/node_modules node_modules
ADD . /www
CMD ["node", "app.js"]