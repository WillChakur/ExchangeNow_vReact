# Build Step
FROM node:22 AS node-builder
RUN mkdir /build
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  

# Production step
FROM nginx:alpine
COPY --from=node-builder /build/dist /usr/share/nginx/html
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
