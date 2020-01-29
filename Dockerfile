FROM node:12.14.1-alpine as builder

RUN apk update && apk add git

WORKDIR /data

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

FROM nginx:1.15.2-alpine

WORKDIR /data

RUN apk --no-cache add tzdata bash ca-certificates \
    && rm -rf /tmp/* \
    && rm -rf /var/cache/apk/*

RUN rm -rf /etc/nginx/conf.d

COPY ./nginx /etc/nginx/conf.d

COPY --from=builder /data/build /data
