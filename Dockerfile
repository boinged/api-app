FROM node:16.15-alpine AS builder
RUN apk --no-cache add git
WORKDIR /usr/src/build

COPY package.json .
COPY package-lock.json .
COPY src src
COPY tsconfig.json .

RUN npm ci
RUN npm run build
RUN rm -r node_modules
RUN npm ci --production
RUN rm -r node_modules/.bin

FROM node:16.15-alpine
RUN apk add --no-cache tini
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules node_modules
COPY --from=builder /usr/src/app/dist dist

EXPOSE 8080
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "-r", "source-map-support/register", "dist/index.js"]
