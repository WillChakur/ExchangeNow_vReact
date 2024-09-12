# build step
FROM node:22 AS node-builder
RUN mkdir /build
WORKDIR /build
COPY ../package*.json ./
RUN npm ci
COPY backend/. ./backend

# production step
FROM alpine:3.20
RUN apk add --update nodejs npm
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --from=node-builder --chown=node:node /build .
CMD ["npm", "run", "server"]

