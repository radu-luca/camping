const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const authController = require("./authController");
const Camp = require("../models/camp");
const Review = require("../models/review");
const { parse } = require("querystring");

exports.getHome = (req, res) => {
  Camp.fetchAll()
    .then((result) => {
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
};

exports.getAbout = (req, res) => {
  let ejsContent = fs.readFileSync(
    path.join(__dirname, "..", "views/about.ejs"),
    "utf-8"
  );
  let htmlRenderized = ejs.render(ejsContent, { filename: "views/about.ejs" });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlRenderized);
};

exports.getCamp = (req, res, id) => {
  Camp.findById(id)
    .then((result) => {
      Review.findByCampId(id)
        .then((reviews) => {
            console.log(reviews);
          let ejsContent = fs.readFileSync(
            path.join(__dirname, "..", "views/campFile.ejs"),
            "utf-8"
          );
          let htmlRenderized = ejs.render(ejsContent, {
            filename: "views/campFile.ejs",
            isLoggedIn: authController.isLoggedIn(req),
            camp: result,
            reviews: reviews,
          });
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(htmlRenderized);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postReview = (req, res) => {
  let body = "";
  req.on("data", (item) => {
    body += item.toString();
  });
  req.on("end", () => {
    let obj = parse(body);
    // console.log(obj);
    let currentUser = authController.getCurrentUser(req);
    let campID = req.headers.referer.split("/")[4];
    let review = new Review(obj.reviewText, obj.star, currentUser._id, campID, currentUser._name)
      .save()
      .then((result) => {
        console.log("review created");
        res.writeHead(302, {
          Location: req.headers.referer,
        });
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
