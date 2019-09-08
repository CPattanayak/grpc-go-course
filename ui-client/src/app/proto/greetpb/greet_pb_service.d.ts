// package: greet
// file: greetpb/greet.proto

import * as greetpb_greet_pb from "../greetpb/greet_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GreetServiceGreet = {
  readonly methodName: string;
  readonly service: typeof GreetService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof greetpb_greet_pb.GreetRequest;
  readonly responseType: typeof greetpb_greet_pb.GreetResponse;
};

type GreetServiceGreetManyTime = {
  readonly methodName: string;
  readonly service: typeof GreetService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof greetpb_greet_pb.GreetManyTimeRequest;
  readonly responseType: typeof greetpb_greet_pb.GreetManyTimeResponse;
};

type GreetServiceLongGreet = {
  readonly methodName: string;
  readonly service: typeof GreetService;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof greetpb_greet_pb.LongGreetRequest;
  readonly responseType: typeof greetpb_greet_pb.LongGreetResponse;
};

type GreetServiceGreetEveryOne = {
  readonly methodName: string;
  readonly service: typeof GreetService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof greetpb_greet_pb.GreetEveryOneRequest;
  readonly responseType: typeof greetpb_greet_pb.GreetEveryOneResponse;
};

export class GreetService {
  static readonly serviceName: string;
  static readonly Greet: GreetServiceGreet;
  static readonly GreetManyTime: GreetServiceGreetManyTime;
  static readonly LongGreet: GreetServiceLongGreet;
  static readonly GreetEveryOne: GreetServiceGreetEveryOne;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class GreetServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  greet(
    requestMessage: greetpb_greet_pb.GreetRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: greetpb_greet_pb.GreetResponse|null) => void
  ): UnaryResponse;
  greet(
    requestMessage: greetpb_greet_pb.GreetRequest,
    callback: (error: ServiceError|null, responseMessage: greetpb_greet_pb.GreetResponse|null) => void
  ): UnaryResponse;
  greetManyTime(requestMessage: greetpb_greet_pb.GreetManyTimeRequest, metadata?: grpc.Metadata): ResponseStream<greetpb_greet_pb.GreetManyTimeResponse>;
  longGreet(metadata?: grpc.Metadata): RequestStream<greetpb_greet_pb.LongGreetRequest>;
  greetEveryOne(metadata?: grpc.Metadata): BidirectionalStream<greetpb_greet_pb.GreetEveryOneRequest, greetpb_greet_pb.GreetEveryOneResponse>;
}

