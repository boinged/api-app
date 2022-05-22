FROM node:16.15-alpine AS builder
RUN apk --no-cache add git
WORKDIR /usr/src/build

COPY tsconfig.json .
COPY package*.json ./
RUN npm ci

COPY src src
RUN npm run build

RUN npm ci --production

FROM node:16.15-alpine
RUN apk add --no-cache tini
WORKDIR /usr/src/app

COPY --from=builder /usr/src/build/node_modules node_modules
COPY --from=builder /usr/src/build/dist dist

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "-r", "source-map-support/register", "dist/index.js"]
