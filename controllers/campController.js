const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

exports.getHome = (req, res) =>{
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/index.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/index.ejs'});
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
}

exports.getAbout = (req,res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/about.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/about.ejs'});
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
}

exports.getCamp = (req,res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/campFile.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/campFile.ejs'});
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
}