FROM node:alpine3.16

RUN mkdir -p /app

WORKDIR /app

COPY static/ ./static

EXPOSE $PORT

CMD ["npx", "http-server", "./static"]
