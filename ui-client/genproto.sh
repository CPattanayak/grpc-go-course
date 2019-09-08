#!/usr/bin/env bash
export project_path=/C/gopath/src/grpc-go-course
./node_modules/protoc/protoc/bin/protoc --plugin=protoc-gen-ts=${project_path}/ui-client/node_modules/.bin/protoc-gen-ts.cmd --js_out=import_style=commonjs,binary:src/app/proto --ts_out=service=true:src/app/proto -I ${project_path}/proto ${project_path}/proto/**/*.proto