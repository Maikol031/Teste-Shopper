FROM node:22-alpine3.20 as builder

WORKDIR /app

COPY . .
RUN npm ci --silent
RUN npm run build

FROM node:22-alpine3.20 as runner

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist 

RUN mkdir -p /app/dist/uploads

RUN addgroup -g 1001 -S nonroot \
    && adduser -u 1001 -S nonroot -G nonroot

RUN chown -R nonroot:nonroot /app/dist/uploads/

USER nonroot
ENV APP_PORT=80
EXPOSE 80
ENTRYPOINT ["npm", "start"]