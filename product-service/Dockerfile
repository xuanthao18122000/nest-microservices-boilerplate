FROM node:16.19.0-alpine as nodemodule
WORKDIR /product-service
COPY /product-service/package.json ./package.json
WORKDIR /product-service
RUN npm install

FROM node:16.19.0-alpine as builder
WORKDIR /product-service
COPY ./product-service .
COPY --from=nodemodule /product-service/node_modules ./node_modules
RUN npm run build

FROM node:16.19.0-alpine as runner
WORKDIR /product-service

RUN apk add --no-cache alpine-conf && \
  setup-timezone -z Asia/Bangkok

COPY --from=builder /product-service/dist ./
COPY --from=builder /product-service/package.json ./package.json
COPY --from=builder /product-service/nest-cli.json ./nest-cli.json
COPY --from=builder /product-service/.env ./.env
COPY --from=builder /product-service/run-container.sh ./run-container.sh
COPY --from=builder /product-service/tsconfig.json ./tsconfig.json
COPY --from=builder /product-service/tsconfig.build.json ./tsconfig.build.json

COPY --from=nodemodule /product-service/node_modules ./node_modules

EXPOSE 3000

CMD ["/bin/sh", "run-container.sh"]
