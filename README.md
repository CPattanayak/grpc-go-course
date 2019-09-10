This project demonstrate how to use grpc with golang and Angularjs
## Project Requirement
     1.go installer [docs](https://golang.org/doc/install)
	 2.Nodejs [docs](https://nodejs.org/en/download/)
	 3.GoGrpc [command](go get -u google.golang.org/grpc) (required to generate only proto file)
	 4.go get -u github.com/golang/protobuf/protoc-gen-go  (required to generate propto file)
	 5.protoc installer [docs](https://github.com/google/protobuf/releases)(can be achived by npm optional)
	 6.glide installer [docs](https://glide.sh/)
	 7. grpcweb go get -u github.com/improbable-eng/grpc-web/go/grpcweb (Optional)
## Project setup
     1.add $GOPATH/bin ,protoc/bin,glide as classpath
	 2. checkout project in $GOPATH/src
## Running Project
     1. change project_path in build.sh as $GOPATH/src/grpc-go-course
     2. ./build.sh access UI [url](http://localhost:4200)

