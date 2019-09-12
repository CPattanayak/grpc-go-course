package main

import (
	"context"
	"fmt"
	"grpc-go-course/proto/greetpb"
	"io"
	"log"
	"net/http"
	"strconv"
	"sync"

	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/status"
)

type server struct{}

func webGetWorker(in <-chan string, wg *sync.WaitGroup,
	stream greetpb.GreetService_GreetEveryOneServer) {
	firstName := <-in
	result := "Processed " + firstName + " !"
	fmt.Printf(result + "\n")

	wg.Done()
}
func (*server) GreetEveryOne(stream greetpb.GreetService_GreetEveryOneServer) error {
	//fmt.Printf("GreetEveryOne getting called\n")
	var wg sync.WaitGroup
	numWorkers := 100
	work := make(chan string, 1024)
	// We'll spin off workers in a thread.
	for i := 0; i < numWorkers; i++ {
		// Within the loop, just spawn the Goroutine
		go webGetWorker(work, &wg, stream)
	}
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
		work <- req.GetGreeting().GetFirstName()

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
	firstNamme := req.GetGreeting().GetFirstName()
	for i := 0; i < 20; i++ {
		result := "Hello " + firstNamme + " number " + strconv.Itoa(i)
		res := &greetpb.GreetManyTimeResponse{
			Result: result,
		}
		stm.Send(res)
		time.Sleep(1000 * time.Millisecond)
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

	fmt.Println("Hello World")

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

	grpclog.Println("Starting server...")
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
