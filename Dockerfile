FROM node:12.16-alpine AS builder
RUN apk --no-cache add git
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY src src
COPY tsconfig.json .

RUN npm install
RUN npm run build

FROM node:12.16-alpine
RUN apk add --no-cache tini
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY --from=builder /usr/src/app/dist dist

RUN npm install --production
RUN rm package.json
RUN rm package-lock.json

EXPOSE 8080
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "-r", "source-map-support/register", "dist/index.js"]
