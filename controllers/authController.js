const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

exports.getProfile = (req,res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/profile.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/profile.ejs'});
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
}

exports.getLogin = (req,res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/login.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/login.ejs'});
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
}

exports.getRegister = (req,res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/register.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/register.ejs'});
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
}