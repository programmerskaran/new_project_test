const Eventemitter = require("events");
class sales extends Eventemitter{
    constructor(){
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
