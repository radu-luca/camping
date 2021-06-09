const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Camp {
  constructor(
    name,
    price,
    phone,
    startDate,
    endDate,
    description,
    imgExtension,
    address,
    city
  ) {
    this.name = name;
    this.price = price;
    this.phone = phone;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.imgExtension = imgExtension;
    this.address = address;
    this.city = city;
  }
  save() {
    const db = getDb();
    return db.collection("camps").insertOne(this);
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("camps")
      .find()
      .toArray()
      .then((campgrounds) => {
        return campgrounds;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static addTextIndex() {
    const db = getDb();
    return db.collection("camps").createIndex({ name: "text" });
  }

  static updateCamp(id, obj) {
    const db = getDb();
    return db.collection("camps").updateOne(id, obj);
  }

  static deleteCamp(id) {
    const db = getDb();
    return db.collection("camps").deleteOne(id);
  }

  static search(query) {
    return getDb().collection("camps").find(query).toArray();
  }

  static findById(campID) {
    const db = getDb();
    return db
      .collection("camps")
      .find({ _id: new mongodb.ObjectId(campID) })
      .next()
      .then((camp) => {
        // console.log(camp);
        return camp;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Camp;
