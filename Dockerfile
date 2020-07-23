# Stage 1 - the build process
FROM node:carbon-alpine as builder
LABEL maintainer="Alexander Zorkin"

WORKDIR /app
COPY package.json yarn.lock ./

RUN npm install --production

COPY . ./
RUN npm run build

# Stage 2 - release
FROM node:8.9-alpine AS release

WORKDIR /app
COPY --from=builder /app/build ./build

RUN npm -g install serve

EXPOSE 9191
CMD ["serve", "-s", "build", "-p", "9191"]
