const Camp = require("../models/camp");
const Review = require("../models/review");

const mongodb = require('mongodb');

const querystring = require("querystring");

exports.getCamps = (req, res) => {
  Camp.fetchAll()
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCamp = (req, res, id) => {
  if (id.length == 24)
    Camp.findById(id)
      .then((result) => {
        if (result) {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        } else {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "camp not found" }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "camp not found" }));
  }
};

exports.getReviews = (req, res) => {
  Review.fetchAll()
    .then((result) => {
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "reviews not found" }));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getReview = (req, res, id) => {
  Review.findReviewById(id)
    .then((result) => {
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "review not found" }));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getReviewsByCampId = (req, res, id) => {
  if (id.length == 24)
    Review.findByCampId(id)
      .then((result) => {
        if (result) {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        } else {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "reviews not found" }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "reviews not found" }));
  }
};

exports.postReview = (req, res) => {
  let newUrl = req.url.substring(req.url.indexOf("?") + 1, req.url.length);
  const obj = querystring.parse(newUrl);
  let review = new Review(
    obj.description,
    obj.rating,
    obj.userID,
    obj.campgroundID,
    obj.userName
  )
    .save()
    .then((result) => {
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "successfully added" }));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "unsuccessfully" }));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCamp = (req, res) => {
  let newUrl = req.url.substring(req.url.indexOf("?") + 1, req.url.length);
  const obj = querystring.parse(newUrl);
  let camp = new Camp(
    obj.name,
    obj.price,
    obj.phone,
    obj.startDate,
    obj.endDate,
    obj.description,
    obj.imgExtension
  )
    .save()
    .then((result) => {
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "successfully added" }));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "unsuccessfully" }));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.putCamp = (req, res) => {
  let newUrl = req.url.substring(req.url.indexOf("?") + 1, req.url.length);
  const obj = querystring.parse(newUrl);

  if (obj._id.length == 24)
    Camp.findById(obj._id)
      .then((result) => {
        if (result) {
            let objId = { _id: new mongodb.ObjectId(obj._id) };

            let objCamp = {
                $set: {
                    name: ((obj.name != null) ? obj.name : result.name),
                    price: ((obj.price != null) ? obj.price : result.price),
                    phone: ((obj.phone != null) ? obj.phone : result.phone),
                    startDate: ((obj.startDate != null) ? obj.startDate : result.startDate),
                    endDate: ((obj.endDate != null) ? obj.endDate : result.endDate),
                    description: ((obj.description != null) ? obj.description : result.description)
                }
            };   
            Camp.updateCamp(objId,objCamp)
            .then(response=>{
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ message: "successfully modified" }));
            })
        }
        else
        {
            let camp = new Camp(
                obj.name,
                obj.price,
                obj.phone,
                obj.startDate,
                obj.endDate,
                obj.description,
                obj.imgExtension
              )
                .save()
                .then((result) => {
                  if (result) {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ message: "successfully added to database" }));
                  } else {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ message: "unsuccessfully" }));
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "unsuccessfully" }));
  }
};

exports.putReview = (req,res) => {
    let newUrl = req.url.substring(req.url.indexOf("?") + 1, req.url.length);
    const obj = querystring.parse(newUrl);
    if (obj._id.length == 24)
    {
        Review.findReviewById(obj._id)
        .then(result =>{
            if(result)
            {
                //if exist modify
                let objId = { _id: new mongodb.ObjectId(obj._id) };
                let objReview= {
                    $set: {
                        message: ((obj.message != null) ? obj.message : result.message),
                        rating: ((obj.rating != null) ? obj.rating : result.rating),
                        userID: ((obj.userID != null) ? obj.userID : result.userID),
                        campgroundID: ((obj.campgroundID != null) ? obj.campgroundID : result.campgroundID),
                        userName: ((obj.userName != null) ? obj.userName : result.userName)
                    }
                };   
                Review.updateReview(objId,objReview)
                .then(response=>{
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ message: "successfully modified" }));
                })
            } else
            {
                // Create if not exist
                let review = new Review(
                    obj.description,
                    obj.rating,
                    obj.userID,
                    obj.campgroundID,
                    obj.userName
                  )
                    .save()
                    .then((result) => {
                      if (result) {
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({ message: "successfully added to database" }));
                      } else {
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({ message: "unsuccessfully" }));
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        })


    } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "unsuccessfully" }));
    }
}

exports.deleteReview = (req,res) =>{
    let newUrl = req.url.substring(req.url.indexOf("?") + 1, req.url.length);
    const obj = querystring.parse(newUrl);

    if (obj._id.length == 24)
    {
        let objId = { _id: new mongodb.ObjectId(obj._id) };
        Review.deleteReview(objId)
        .then(result=>{
            if(result.deletedCount == 0) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "unsuccessfully" }));
            }
            else
            {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ message: "successfully deleted" }));
            }

        })
        .catch(err => {
            console.log(err);
        })
    } else
    {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "unsuccessfully" }));
    }
}

exports.deleteCamp = (req,res) => {
    let newUrl = req.url.substring(req.url.indexOf("?") + 1, req.url.length);
    const obj = querystring.parse(newUrl);

    if (obj._id.length == 24)
    {
        let objId = { _id: new mongodb.ObjectId(obj._id) };
        Camp.deleteCamp(objId)
        .then(result=>{
            if(result.deletedCount == 0) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "unsuccessfully" }));
            }
            else
            {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ message: "successfully deleted" }));
            }

        })
        .catch(err => {
            console.log(err);
        })
    } else
    {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "unsuccessfully" }));
    }
}