FROM golang:1.15-alpine

ENV CGO_ENABLED 0
ENV GOOS linux
ENV GOARCH amd64
RUN apk update && \
    apk add --no-cache git ca-certificates && \
    update-ca-certificates && \
    go get github.com/canthefason/go-watcher && \
    go install github.com/canthefason/go-watcher/cmd/watcher
WORKDIR /go/src/$WORK_DIR
CMD watcher
