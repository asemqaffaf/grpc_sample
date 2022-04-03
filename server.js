const PROTO_PATH = './sample.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });

const sampleProto = grpc.loadPackageDefinition(packageDef).sample;

const callbackFunction = () => {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  return 'callback return :>';
};
function testFunction(call, callback) {
  callback(null, { value: 'Hello ', callbackFunction });
}

function main() {
  const server = new grpc.Server();
  server.addService(sampleProto.ServiceSample.service, { testFunction });

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
