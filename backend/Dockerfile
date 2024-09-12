# Build Step
FROM node:22 AS node-builder
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY ./backend ./backend

# Production Step
FROM alpine:3.20
RUN apk add --update nodejs npm
RUN addgroup -S node && adduser -S node -G node
USER node
WORKDIR /home/node/app
COPY --from=node-builder --chown=node:node /build/backend .

# Set Up for Heroku

ENV PORT=3000
EXPOSE $PORT

CMD ["npm", "run", "server"]

