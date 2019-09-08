// package: greet
// file: greetpb/greet.proto

import * as jspb from "google-protobuf";

export class Greeting extends jspb.Message {
  getFirstName(): string;
  setFirstName(value: string): void;

  getLastName(): string;
  setLastName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Greeting.AsObject;
  static toObject(includeInstance: boolean, msg: Greeting): Greeting.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Greeting, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Greeting;
  static deserializeBinaryFromReader(message: Greeting, reader: jspb.BinaryReader): Greeting;
}

export namespace Greeting {
  export type AsObject = {
    firstName: string,
    lastName: string,
  }
}

export class GreetRequest extends jspb.Message {
  hasGreeting(): boolean;
  clearGreeting(): void;
  getGreeting(): Greeting | undefined;
  setGreeting(value?: Greeting): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GreetRequest): GreetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GreetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetRequest;
  static deserializeBinaryFromReader(message: GreetRequest, reader: jspb.BinaryReader): GreetRequest;
}

export namespace GreetRequest {
  export type AsObject = {
    greeting?: Greeting.AsObject,
  }
}

export class GreetManyTimeRequest extends jspb.Message {
  hasGreeting(): boolean;
  clearGreeting(): void;
  getGreeting(): Greeting | undefined;
  setGreeting(value?: Greeting): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetManyTimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GreetManyTimeRequest): GreetManyTimeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GreetManyTimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetManyTimeRequest;
  static deserializeBinaryFromReader(message: GreetManyTimeRequest, reader: jspb.BinaryReader): GreetManyTimeRequest;
}

export namespace GreetManyTimeRequest {
  export type AsObject = {
    greeting?: Greeting.AsObject,
  }
}

export class GreetResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GreetResponse): GreetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GreetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetResponse;
  static deserializeBinaryFromReader(message: GreetResponse, reader: jspb.BinaryReader): GreetResponse;
}

export namespace GreetResponse {
  export type AsObject = {
    result: string,
  }
}

export class GreetManyTimeResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetManyTimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GreetManyTimeResponse): GreetManyTimeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GreetManyTimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetManyTimeResponse;
  static deserializeBinaryFromReader(message: GreetManyTimeResponse, reader: jspb.BinaryReader): GreetManyTimeResponse;
}

export namespace GreetManyTimeResponse {
  export type AsObject = {
    result: string,
  }
}

export class LongGreetRequest extends jspb.Message {
  hasGreeting(): boolean;
  clearGreeting(): void;
  getGreeting(): Greeting | undefined;
  setGreeting(value?: Greeting): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LongGreetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LongGreetRequest): LongGreetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LongGreetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LongGreetRequest;
  static deserializeBinaryFromReader(message: LongGreetRequest, reader: jspb.BinaryReader): LongGreetRequest;
}

export namespace LongGreetRequest {
  export type AsObject = {
    greeting?: Greeting.AsObject,
  }
}

export class LongGreetResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LongGreetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LongGreetResponse): LongGreetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LongGreetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LongGreetResponse;
  static deserializeBinaryFromReader(message: LongGreetResponse, reader: jspb.BinaryReader): LongGreetResponse;
}

export namespace LongGreetResponse {
  export type AsObject = {
    result: string,
  }
}

export class GreetEveryOneRequest extends jspb.Message {
  hasGreeting(): boolean;
  clearGreeting(): void;
  getGreeting(): Greeting | undefined;
  setGreeting(value?: Greeting): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetEveryOneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GreetEveryOneRequest): GreetEveryOneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GreetEveryOneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetEveryOneRequest;
  static deserializeBinaryFromReader(message: GreetEveryOneRequest, reader: jspb.BinaryReader): GreetEveryOneRequest;
}

export namespace GreetEveryOneRequest {
  export type AsObject = {
    greeting?: Greeting.AsObject,
  }
}

export class GreetEveryOneResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetEveryOneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GreetEveryOneResponse): GreetEveryOneResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GreetEveryOneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetEveryOneResponse;
  static deserializeBinaryFromReader(message: GreetEveryOneResponse, reader: jspb.BinaryReader): GreetEveryOneResponse;
}

export namespace GreetEveryOneResponse {
  export type AsObject = {
    result: string,
  }
}

