// package: greet
// file: greetpb/greet.proto

var greetpb_greet_pb = require("../greetpb/greet_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var GreetService = (function () {
  function GreetService() {}
  GreetService.serviceName = "greet.GreetService";
  return GreetService;
}());

GreetService.Greet = {
  methodName: "Greet",
  service: GreetService,
  requestStream: false,
  responseStream: false,
  requestType: greetpb_greet_pb.GreetRequest,
  responseType: greetpb_greet_pb.GreetResponse
};

GreetService.GreetManyTime = {
  methodName: "GreetManyTime",
  service: GreetService,
  requestStream: false,
  responseStream: true,
  requestType: greetpb_greet_pb.GreetManyTimeRequest,
  responseType: greetpb_greet_pb.GreetManyTimeResponse
};

GreetService.LongGreet = {
  methodName: "LongGreet",
  service: GreetService,
  requestStream: true,
  responseStream: false,
  requestType: greetpb_greet_pb.LongGreetRequest,
  responseType: greetpb_greet_pb.LongGreetResponse
};

GreetService.GreetEveryOne = {
  methodName: "GreetEveryOne",
  service: GreetService,
  requestStream: true,
  responseStream: true,
  requestType: greetpb_greet_pb.GreetEveryOneRequest,
  responseType: greetpb_greet_pb.GreetEveryOneResponse
};

exports.GreetService = GreetService;

function GreetServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GreetServiceClient.prototype.greet = function greet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GreetService.Greet, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GreetServiceClient.prototype.greetManyTime = function greetManyTime(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GreetService.GreetManyTime, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GreetServiceClient.prototype.longGreet = function longGreet(metadata) {
  var listeners = {
    end: [],
    status: []
  };
  var client = grpc.client(GreetService.LongGreet, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      if (!client.started) {
        client.start(metadata);
      }
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GreetServiceClient.prototype.greetEveryOne = function greetEveryOne(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(GreetService.GreetEveryOne, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.GreetServiceClient = GreetServiceClient;

