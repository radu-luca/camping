const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { parse } = require("querystring");
const jwt = require('jsonwebtoken');
const secretJWT = 'lsfnlNnfLnf398U';
const authController = require("./authController");
const User = require("../models/user");

exports.getProfile = (req, res) => {
    let currentUserID = authController.getCurrentUser(req)._id;
    res.writeHead(302, {
        Location: "/profile/"+currentUserID,
      });
      res.end();
};

exports.getProfileById = (req,res,id) => {
    User.findById(id)
    .then(result =>{
        console.log(result);
        if(result != null)
        {
            let currentUser = false;
            if(result._id == authController.getCurrentUser(req)._id)
            currentUser = true;

            // console.log(result);
            let ejsContent = fs.readFileSync(
                path.join(__dirname, "..", "views/profile.ejs"),
                "utf-8"
            );
            let htmlRenderized = ejs.render(ejsContent, {
                filename: "views/profile.ejs", isLoggedIn: authController.isLoggedIn(req),
                user: {name: result.name,email: result.email, phone: result.phone},
                currentUser: currentUser
            });
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(htmlRenderized);
        }
        else
        {
            res.writeHead(302, {
                Location: "/404",
              });
              res.end();
        }

    })
    .catch(err => {
        console.log(err);
    })
}