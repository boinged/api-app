FROM node:18.12-alpine AS builder
RUN apk --no-cache add git
WORKDIR /usr/src/build

COPY tsconfig.json .
COPY package*.json ./
RUN npm ci

COPY src src
RUN npm run build

RUN npm ci --omit=dev

FROM node:18.12-alpine
RUN apk add --no-cache tini
WORKDIR /usr/src/app

COPY --from=builder /usr/src/build/node_modules node_modules
COPY --from=builder /usr/src/build/dist dist

USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "-r", "source-map-support/register", "dist/index.js"]
