# Stage 1: build frontend
FROM node:16.13.0 as frontend-builder

COPY front /tmp/workspace
WORKDIR /tmp/workspace
RUN yarn install && yarn build

# Stage 2: build server
FROM golang:1.17.3 as backend-builder

COPY server /tmp/workspace
WORKDIR /tmp/workspace
RUN CGO_ENABLED=0 go build -o go-react-boilerplate -trimpath .

RUN ./go-react-boilerplate -webroot ./build