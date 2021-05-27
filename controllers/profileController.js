const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { parse } = require("querystring");
const jwt = require('jsonwebtoken');
const secretJWT = 'lsfnlNnfLnf398U';
const authController = require("./authController");

exports.getProfile = (req, res) => {

    let ejsContent = fs.readFileSync(
        path.join(__dirname, "..", "views/profile.ejs"),
        "utf-8"
    );
    let htmlRenderized = ejs.render(ejsContent, {
        filename: "views/profile.ejs", isLoggedIn: authController.isLoggedIn(req)
    });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlRenderized);
};