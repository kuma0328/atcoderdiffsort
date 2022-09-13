FROM node:16.0.0

COPY ./front /app/front
WORKDIR /app/front

RUN npm install -g serve
RUN npm install && npm build
RUN serve -s build

FROM golang:1.17.3

COPY ./server /app/server
WORKDIR /app/server

RUN go mod download
RUN go build *.go
RUN ./get_db_query
