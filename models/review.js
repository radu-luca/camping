const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Review {
  constructor(message, rating, userID, campgroundID, userName) {
    this.message = message;
    this.rating = rating;
    this.userID = userID;
    this.campgroundID = campgroundID;
    this.userName = userName;
  }
  save() {
    const db = getDb();
    return db.collection("reviews").insertOne(this);
  }

  static updateReview(id, obj) {
    const db = getDb();
    return db.collection("reviews").updateOne(id, obj);
  }

  static deleteReview(id)
  {
    const db = getDb();
    return db.collection("reviews").deleteOne(id);
  }
  static findByCampId(campID) {
    const db = getDb();
    return db
      .collection("reviews")
      .find({ campgroundID: campID })
      .toArray()
      .then((camp) => {
        //  console.log(camp);
        return camp;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("reviews")
      .find()
      .toArray()
      .then((reviews) => {
        return reviews;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findReviewById(ID) {
    const db = getDb();
    return db
      .collection("reviews")
      .find({ _id: new mongodb.ObjectId(ID) })
      .next()
      .then((review) => {
        return review;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = Review;
