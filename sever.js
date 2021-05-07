const http = require("http");
const ejs = require('ejs');

const campsController = require("./controllers/campController");
const utilController = require("./controllers/utilController");
const adminController = require("./controllers/adminController");
const authController = require("./controllers/authController");
const errorController = require("./controllers/errorController");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    return campsController.getHome(req, res);
  }
  if (req.url === "/about" && req.method === "GET") {
    return campsController.getAbout(req, res);
  }
  if(req.url === "/add" && req.method === "GET")
  {
    return adminController.getAdd(req,res);
  }
  if(req.url === "/profile" && req.method === "GET")
  {
    return authController.getProfile(req,res);
  }
  if(req.url === "/login" && req.method === "GET")
  {
    return authController.getLogin(req,res);
  }
  if(req.url === "/register" && req.method === "GET")
  {
    return authController.getRegister(req,res);
  }
  if(req.url === "/campground" && req.method === "GET") 
  {
    return campsController.getCamp(req,res);
  }
  if(req.url === "/contact" && req.method === "GET")
  {
    return adminController.getContact(req,res);
  }
  if(req.url == "/contact" && req.method === "POST")
  {
    return adminController.postContact(req,res);
  }
  if (req.url.indexOf(".") != -1) {
    return utilController.getUtilFiles(req, res);
  }
  errorController.get404(req,res);
});

const PORT = 5000;

server.listen(PORT);
