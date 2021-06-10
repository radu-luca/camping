const path = require("path");
const fs = require("fs");

exports.getUtilFiles = (req,res) => {
    var filePath = "." + req.url;
    var extname = String(path.extname(filePath)).toLowerCase();
    console.log(extname);
    var mimeTypes = {
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".webp": "image/webp",
      ".jpg": "image/jpg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
      ".txt" : "text/plain",
      ".ico" : "image/icon",
    };
    console.log(contentType);
    var contentType = mimeTypes[extname];
    // if(req.url.includes('favicon.ico'))
    // res.writeHead(204).end();
    // else
    fs.readFile(filePath, function (error, content) {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    });
};