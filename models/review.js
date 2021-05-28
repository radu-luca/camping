const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Review{
    constructor(message,rating,userID,campgroundID,userName)
    {
        this.message = message;
        this.rating = rating;
        this.userID = userID;
        this.campgroundID = campgroundID;
        this.userName = userName;
    }
    save() {
        const db = getDb();
        return db.collection('reviews').insertOne(this);
      }

    static findByCampId(campID) {
        const db = getDb();
        return db
          .collection('reviews')
          .find({ campgroundID: campID})
          .toArray()
          .then(camp => {
            //  console.log(camp);
            return camp;
          })
          .catch(err => {
            console.log(err);
          });
      }
}
module.exports = Review;