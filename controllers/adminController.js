const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { parse } = require('querystring');
const authController = require("./authController");
const Camp = require("../models/camp");
const formidable = require('formidable');



exports.getAdd = (req, res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/add.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, { filename: 'views/add.ejs', isLoggedIn: authController.isLoggedIn(req) });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
};

exports.postAdd = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {


        let camp = new Camp(fields.name_camp, fields.price, fields.phone, fields.start_date, fields.end_date, fields.description, path.extname(files.imagini.name).toString(), fields.address, fields.city)
            .save()
            .then(result => {
                var oldPath = files.imagini.path;
                var newPath = path.join(__dirname, '..', "public/images")
                    + '/' + result.ops[0]._id.toString() + path.extname(files.imagini.name);

                var rawData = fs.readFileSync(oldPath)

                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                })
                res.writeHead(302, {
                    Location: "/",
                });
                res.end();
            })
            .catch(err => {
                console.log(err);
            });

    });


}

exports.getContact = (req, res) => {
    let ejsContent = fs.readFileSync(path.join(__dirname, "..", "views/contact.ejs"), 'utf-8');
    let htmlRenderized = ejs.render(ejsContent, { filename: 'views/contact.ejs', isLoggedIn: authController.isLoggedIn(req) });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
};

exports.postContact = (req, res) => {
    let body = '';
    req.on('data', item => {
        body += item.toString();
    });
    req.on('end', () => {
        let obj = parse(body);
    });
    res.writeHead(302, {
        'Location': req.url
    });
    res.end();
}