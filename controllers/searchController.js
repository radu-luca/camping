const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { parse } = require("querystring");
const mongodb = require('mongodb');
const authController = require("./authController");
const Camp = require('../models/camp');

exports.search = (req, res) => {
    Camp.addTextIndex();
    let body = "";
    req.on("data", (item) => {
        body += item.toString();
    });
    req.on("end", () => {
        let obj = parse(body);
        const query = { $text: { $search: obj.search } };
        Camp.search(query)
            .then(result => {
                let ejsContent = fs.readFileSync(
                    path.join(__dirname, "..", "views/index.ejs"),
                    "utf-8"
                );
                let htmlRenderized = ejs.render(ejsContent, {
                    filename: "views/index.ejs",
                    isLoggedIn: authController.isLoggedIn(req),
                    camps: result,
                });
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(htmlRenderized);
            })
            .catch((err) => {
                console.log(err);
            });


    });
}

