const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const {parse} = require('querystring');

exports.getAdd = (req,res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/add.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/add.ejs' });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
};

exports.getContact = (req,res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/contact.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, {filename: 'views/contact.ejs'});
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
};

exports.postContact = (req,res) => {
    let body = '';
    req.on('data', item=> {
        body += item.toString();
    });
    req.on('end', () => {
        let obj = parse(body);
        console.log(obj.email);
        console.log(obj.message);
    });
    res.writeHead(302, {
        'Location': req.url
      });
      res.end();
}