const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'your-proto-file.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const yourProto = grpc.loadPackageDefinition(packageDefinition).yourProtoPackageName;

function searchQuestions(call, callback) {
  // Implement your search logic here
  callback(null, { /* response data */ });
}

const server = new grpc.Server();
server.addService(yourProto.YourService.service, { searchQuestions });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
