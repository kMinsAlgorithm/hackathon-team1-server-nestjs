# declare base image - node 18.13.0
FROM node:18-alpine AS builder

# make work directory and copy files
WORKDIR /app
COPY . .

# project dependency install
RUN yarn
RUN yarn run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /app ./

EXPOSE 3000
CMD yarn start:prod
