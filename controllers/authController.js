const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { parse } = require("querystring");
const jwt = require('jsonwebtoken');

const User = require("../models/user");

exports.getProfile = (req, res) => {

  let ejsContent = fs.readFileSync(
    path.join(__dirname, "..", "views/profile.ejs"),
    "utf-8"
  );
  let htmlRenderized = ejs.render(ejsContent, {
    filename: "views/profile.ejs",
  });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlRenderized);
};

exports.getLogin = (req, res) => {
  let ejsContent = fs.readFileSync(
    path.join(__dirname, "..", "views/login.ejs"),
    "utf-8"
  );
  let htmlRenderized = ejs.render(ejsContent, { filename: "views/login.ejs" });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlRenderized);
};

exports.postLogin = (req, res) => {
  let body = "";
  req.on("data", (item) => {
    body += item.toString();
  });
  req.on("end", () => {
    let obj = parse(body);
    User.findDb(obj.email_log, obj.password_login).then((result) => {
      if (result) {
        console.log("Login successful");
      }
      else console.log("Login unsuccessful");
    });
  });
  res.writeHead(302, {
    Location: "/",
  });
  res.end();
};

exports.postRegister = (req, res) => {
  let body = "";
  req.on("data", (item) => {
    body += item.toString();
  });
  req.on("end", () => {
    let obj = parse(body);
    console.log(obj);
    let user = new User(obj.name, obj.email, obj.phone, obj.password)
      .save()
      .then((result) => {
        console.log("User created");
        res.writeHead(302, {
          Location: "/login",
        });
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getRegister = (req, res) => {
  let ejsContent = fs.readFileSync(
    path.join(__dirname, "..", "views/register.ejs"),
    "utf-8"
  );
  let htmlRenderized = ejs.render(ejsContent, {
    filename: "views/register.ejs",
  });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlRenderized);
};
