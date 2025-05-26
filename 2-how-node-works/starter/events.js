const Eventemitter = require("events");
const http = require('http');
class sales extends Eventemitter {
  constructor() {
    super();
  }
}


const myEmitter = new sales();

myEmitter.on("Onsale", () => {
  console.log("The Product is on Sale!!");
});

myEmitter.on("Onsale", () => {
  console.log("Customer now buy product");
});

myEmitter.on("Onsale", (stock) => {
  console.log(`Now ${stock} is on the stock`);
});

myEmitter.emit("Onsale", 9);

//===============================================


const server = http.createServer();

server.on('request', (req, res) => {
  console.log("Request Received");
  console.log(req.url);

  res.end("Request Received");
});

server.on('request', (req, res) => {
  console.log("Another Request Received");
});

server.on('close', () => {
  console.log("Server Closed");

});

server.listen(8000, "127.0.0.1", () => {
  console.log('waiting for requests');

})