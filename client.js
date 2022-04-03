const PROTO_PATH = './sample.proto';

// const parseArgs = require('minimist');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const samplePoto = grpc.loadPackageDefinition(packageDef).sample;

const main = () => {
  const target = 'localhost:50051';

  const client = new samplePoto.ServiceSample(target, grpc.credentials.createInsecure());

  client.testFunction({ key: 'key val' }, (err, res) => {
    console.log('err :>> ', err);
    if (err) {
      console.log(err);
      return;
    }
    console.log('res :>> ', res);
    const cb = eval(res.callbackFunction);
    cb();
    // another way to invoke the function.

    // const copyFunc = new Function('return ' + res.callbackFunction)();

    // console.log('copyFunc :>> ', copyFunc());
  });
};
main();
