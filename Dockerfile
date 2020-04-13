FROM node:10.16-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY public public
COPY src src
COPY tsconfig.json .

RUN npm install
RUN npm run build
RUN npm prune --production

RUN rm package-lock.json
RUN rm -rf src
RUN rm tsconfig.json

EXPOSE 8080

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "-r", "source-map-support/register", "dist/index.js"]
