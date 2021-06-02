const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(name, email, phone, password, githubToken) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.githubToken = githubToken;
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  };
  static updateUser(id, obj) {
    const db = getDb();
    return db
      .collection("users")
      .updateOne(id, obj);
  };

  static findDb(emaill, passwordd) {
    //  console.log(emaill, passwordd);
    const db = getDb();
    return db
      .collection('users')
      .find({ email: emaill, password: passwordd })
      .next()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      })
  }
  static findById(ID) {
    const db = getDb();
    return db
      .collection('users')
      .find({ _id: new mongodb.ObjectId(ID) })
      .next()
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByToken(token) {
    const db = getDb();
    return db
      .collection('users')
      .find({ githubToken: token })
      .next()
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }

}

module.exports = User;