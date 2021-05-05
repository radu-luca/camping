const fs = require('fs');
const path = require('path');

exports.getCamps = (req, res) =>{
    fs.readFile(path.join(__dirname, "..", "views/index.html"), (err, content) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content, "utf8");
    })
}