FROM node:16.19.0-alpine as nodemodule
WORKDIR /user-service
COPY user-service/package.json ./package.json
WORKDIR /user-service
RUN npm install

FROM node:16.19.0-alpine as builder
WORKDIR /user-service
COPY ./user-service .
COPY --from=nodemodule /user-service/node_modules ./node_modules
RUN npm run build

FROM node:16.19.0-alpine as runner
WORKDIR /user-service

RUN apk add --no-cache alpine-conf && \
  setup-timezone -z Asia/Bangkok

COPY --from=builder /user-service/dist ./
COPY --from=builder /user-service/package.json ./package.json
COPY --from=builder /user-service/nest-cli.json ./nest-cli.json
COPY --from=builder /user-service/.env ./.env
COPY --from=builder /user-service/run-container.sh ./run-container.sh
COPY --from=builder /user-service/tsconfig.json ./tsconfig.json
COPY --from=builder /user-service/tsconfig.build.json ./tsconfig.build.json

COPY --from=nodemodule /user-service/node_modules ./node_modules

EXPOSE 3000

CMD ["/bin/sh", "run-container.sh"]
