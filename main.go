package main

import (
	"context"
	"fmt"
	"grpc-go-course/proto/greetpb"
	"io"
	"log"
	"net/http"
	"sync"

	//"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type server struct{}
type GreetMessage struct {
	Message string
}

func webGetWorker(firstName string, wg *sync.WaitGroup) {

	result := "Processed " + firstName + " !"
	//fmt.Printf(result + "\n")
	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	//fmt.Println("Connected to MongoDB!")

	// Get a handle for your collection
	collection := client.Database("greetdb").Collection("greetpeople")

	// Some dummy data to add to the Database
	ruan := GreetMessage{Message: result}

	// Insert a single document
	insertResult, err := collection.InsertOne(context.TODO(), ruan)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a single document: ", insertResult.InsertedID)
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connection to MongoDB closed.")
	}
	wg.Done()
}
func (*server) GreetEveryOne(stream greetpb.GreetService_GreetEveryOneServer) error {
	//fmt.Printf("GreetEveryOne getting called\n")
	var wg sync.WaitGroup

	for {
		req, err := stream.Recv()
		if err == io.EOF {
			return nil
		}
		if err != nil {
			log.Fatalf("Error while reading client stream: %v", err)
		}
		result := "Received " + req.GetGreeting().GetFirstName()
		srErr := stream.Send(&greetpb.GreetEveryOneResponse{
			Result: result,
		})
		if srErr != nil {
			log.Fatalf("Error webGetWorker stream: %v", srErr)
		}
		wg.Add(1)
		go webGetWorker(req.GetGreeting().GetFirstName(), &wg)

	}

}

func (*server) Greet(ctx context.Context, req *greetpb.GreetRequest) (*greetpb.GreetResponse, error) {
	fmt.Printf("Greet function was invoked with %v", req)
	firstNamme := req.GetGreeting().GetFirstName()
	if len(firstNamme) == 0 {
		return nil, status.Errorf(
			codes.InvalidArgument, fmt.Sprintf("Received Invalid input: %v", firstNamme),
		)
	}
	result := "Hello " + firstNamme
	res := &greetpb.GreetResponse{
		Result: result,
	}
	return res, nil
}

func (*server) GreetManyTime(req *greetpb.GreetManyTimeRequest, stm greetpb.GreetService_GreetManyTimeServer) error {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	//fmt.Println("Connected to MongoDB!")

	// Get a handle for your collection
	collection := client.Database("greetdb").Collection("greetpeople")
	findOptions := options.Find()
	findOptions.SetLimit(10000)
	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(context.TODO()) {
		var elem GreetMessage
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
		res := &greetpb.GreetManyTimeResponse{
			Result: elem.Message,
		}
		stm.Send(res)

	}
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connection to MongoDB closed.")
	}

	return nil
}
func (*server) LongGreet(stm greetpb.GreetService_LongGreetServer) error {
	fmt.Printf("Executing LongGreet")
	result := ""
	for {
		req, err := stm.Recv()
		if err == io.EOF {
			//Finished reading stream
			return stm.SendAndClose(&greetpb.LongGreetResponse{
				Result: result,
			})
		}
		if err != nil {
			log.Fatalf("Error while receiving client stream: %v", err)
		}
		firstName := req.GetGreeting().GetFirstName()
		result += "Hello " + firstName + "! "

	}
}
func main() {

	//fmt.Println("Hello World")

	s := grpc.NewServer()
	greetpb.RegisterGreetServiceServer(s, &server{})
	wrappedServer := grpcweb.WrapServer(s, grpcweb.WithWebsockets(true))

	handler := func(res http.ResponseWriter, req *http.Request) {
		wrappedServer.ServeHTTP(res, req)
	}

	httpServer := &http.Server{
		Addr:    fmt.Sprintf(":%d", 50051),
		Handler: allowCORS(http.HandlerFunc(handler)),
	}

	fmt.Println("Starting server...")
	log.Fatalln(httpServer.ListenAndServe())

}
func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				preflightHandler(w, r)
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}
func preflightHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Expose-Headers", "grpc-status, grpc-message")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, XMLHttpRequest, x-user-agent, x-grpc-web, grpc-status, grpc-message")
	//glog.Infof("preflight request for %s", r.URL.Path)
}
