const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

exports.get404 = (req,res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/404.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/404.ejs'});
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
}