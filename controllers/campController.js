const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const authController = require("./authController");
const Camp = require("../models/camp");
const Review = require("../models/review");
const Book = require("../models/book");
const { parse } = require("querystring");
const mongodb = require('mongodb');
const { default: fetch } = require("node-fetch");

exports.getBookings = (req, res) => {
  Book.fetchAll()
    .then(bookings => {
      res.writeHead(200, {
        'Content-type': 'application/json'
      })
      res.end(JSON.stringify(bookings));
    })
}

exports.addBook = (req, res) => {
  let body = "";
  req.on("data", (item) => {
    body += item.toString();
  });
  req.on("end", () => {
    let obj = parse(body);
    // user_id and camp_id ???
    let currentUser = authController.getCurrentUser(req);
    let campID = req.headers.referer.split("/")[4];
    if(currentUser)
    Camp.findById(campID)
      .then(camp => {
        let book = new Book(obj.startBooking, obj.endBooking, currentUser._id, campID, camp.name)
          .save()
          .then((result) => {
            console.log("booking created");
            res.writeHead(302, {
              Location: req.headers.referer,
            });
            res.end();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      else
      {
        res.writeHead(302, {
          Location: req.headers.referer,
        });
        res.end();
      }

  });
}

exports.deleteBooking = (req, res, id) => {
  let objId = { _id: new mongodb.ObjectId(id) };

  Book.deleteBooking(objId)
    .then(result => {
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.end("Error!");
    })
}

exports.getHome = (req, res) => {
  Camp.getValidCamps()
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
          fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily%22?city=${result.city}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "x-rapidapi-key": "9d80b9c20emsh9320da2337d5033p106231jsn6a8cccc0d42c",
              "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
              "useQueryString": true
            },
          }).then(data => data.json())
            .then(dataJson => {
              console.log(dataJson);
              let ejsContent = fs.readFileSync(
                path.join(__dirname, "..", "views/campFile.ejs"),
                "utf-8"
              );
              let htmlRenderized = ejs.render(ejsContent, {
                filename: "views/campFile.ejs",
                isLoggedIn: authController.isLoggedIn(req),
                camp: result,
                reviews: reviews,
                weather: dataJson.data
              });
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(htmlRenderized);
            })
            .catch(err => {
              console.log(err);
            })

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
    if(currentUser)
    {
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
    }
      else
      {
        res.writeHead(302, {
          Location: req.headers.referer,
        });
        res.end();
      }
  });
};
