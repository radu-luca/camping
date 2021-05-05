const http = require("http");
const path = require("path");
const fs = require("fs");
const CampsController = require("./controllers/campController");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    CampsController.getCamps(req, res);
  } else if (req.url.indexOf(".") != -1) {
    var filePath = "." + req.url;
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };
    var contentType = mimeTypes[extname];

    fs.readFile(filePath, function (error, content) {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    });
  }
});

const PORT = 5000;

server.listen(PORT);
