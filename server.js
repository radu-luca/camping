const http = require("http");
const ejs = require('ejs');

const campsController = require("./controllers/campController");
const utilController = require("./controllers/utilController");
const adminController = require("./controllers/adminController");
const authController = require("./controllers/authController");
const errorController = require("./controllers/errorController");
const profileController = require("./controllers/profileController");

const mongoConnect = require('./util/database').mongoConnect;
const { MongoClient } = require("mongodb");

const server = http.createServer((req, res) => {

  if (req.url === "/" && req.method === "GET") {
    return campsController.getHome(req, res);
  }
  if (req.url === "/about" && req.method === "GET") {
    return campsController.getAbout(req, res);
  }
  if (req.url === "/add" && req.method === "GET") {
    if (!authController.isLoggedIn(req)) {
      redirect(res, "/login");
      return res.end();
    }
    return adminController.getAdd(req, res);
  }
  if (req.url === "/profile" && req.method === "GET") {
    if (!authController.isLoggedIn(req)) {
      redirect(res, "/login");
      return res.end();
    }
    return profileController.getProfile(req, res);
  }
  if(req.url.match(/\/profile\/\w+/) && req.method === "GET"){
    const id = req.url.split('/')[2];
    if(id.length == 24)
    return profileController.getProfileById(req,res,id);
    else
    return errorController.get404(req,res);
  }
  if(req.url.match(/\/profile\/\w+/) && req.method === "PUT"){
    const id = req.url.split('/')[2];
    if(id.length == 24 && authController.isLoggedIn(req))
    {
     return profileController.putProfile(req,res,id);
    } 
    else
    return errorController.get404(req,res);
  }
  if (req.url === "/login" && req.method === "GET") {
    if (authController.isLoggedIn(req)) {
      redirect(res, "/")
      return res.end();
    }
    return authController.getLogin(req, res);
  }
  if (req.url === "/register" && req.method === "GET") {
    if (authController.isLoggedIn(req)) {
      redirect(res, "/");
      return res.end();
    }
    return authController.getRegister(req, res);
  }
  if (req.url === "/register" && req.method === "POST") {
    return authController.postRegister(req, res);
  }
  if(req.url.match(/\/campground\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    return campsController.getCamp(req, res,id);
  }
  if(req.url === "/leave-review" && req.method === "POST"){
    return campsController.postReview(req,res);
  }
  if (req.url === "/contact" && req.method === "GET") {
    return adminController.getContact(req, res);
  }
  if (req.url == "/contact" && req.method === "POST") {
    return adminController.postContact(req, res);
  }
  if (req.url == "/login" && req.method === "POST") {
    return authController.postLogin(req, res);
  }
  if (req.url == "/logout" && req.method === "GET") {
    return authController.logOut(req, res);
  }
  if(req.url == "/add" && req.method === "POST")
  {
    return adminController.postAdd(req,res);
  }
  if (req.url.indexOf(".") != -1) {
    return utilController.getUtilFiles(req, res);
  }
  errorController.get404(req, res);
});

function redirect(res, path) {
  res.writeHead(302, {
    Location: path,
  });
}


mongoConnect(() => {
  server.listen(5000);
});

