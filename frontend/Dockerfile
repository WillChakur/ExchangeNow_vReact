FROM node:22 AS node-builder

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build  # This creates the production-ready build

FROM nginx:alpine

COPY --from=node-builder /build/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
