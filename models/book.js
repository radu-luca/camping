const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Book {
    constructor(startDate, endDate, userID, campgroundID, campName) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.userID = userID;
        this.campgroundID = campgroundID;
        this.campName = campName;
    }
    save() {
        const db = getDb();
        return db.collection("books").insertOne(this);
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection("books")
            .find()
            .toArray()
            .then((bookings) => {
                return bookings;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    static fetchAllById(id) {
        const db = getDb();
        return db
            .collection("books")
            .find({ userID: id })
            .toArray()
            .then((bookings) => {
                return bookings;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
module.exports = Book;
