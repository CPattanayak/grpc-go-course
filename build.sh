 #!/bin/bash
 export project_path=/C/gopath/src/grpc-go-course
 echo "##################################"
 echo "generating proto file for go"
 echo "###################################"
 
 protoc proto/greetpb/greet.proto --go_out=plugins=grpc:.
 echo "##########################"
 echo "building go project"
 echo "##########################"
 glide install
 go build
 echo "############################################"
 echo "building client project and generating proto"
 echo "############################################"
 cd ui-client
 npm install
./node_modules/protoc/protoc/bin/protoc --plugin=protoc-gen-ts=${project_path}/ui-client/node_modules/.bin/protoc-gen-ts.cmd --js_out=import_style=commonjs,binary:src/app/proto --ts_out=service=true:src/app/proto -I ${project_path}/proto ${project_path}/proto/**/*.proto

 cd ..
 echo "#############################"
 echo "build successful"
 echo "#############################"
 echo "starting backend and ui server"
 echo "############################"
 
 grpc-go-course & cd ui-client;npm start && fg