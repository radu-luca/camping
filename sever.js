const http = require("http");
const fs = require("fs");

const campController = require("./controllers/campController");

http
  .createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        let htmlCon = campController.getHome();
        console.log(htmlCon);
      res.writeHead(200,{ "Content-Type": "text/html" });
      res.end(htmlCon);
    }
  })
  .listen(3000);
