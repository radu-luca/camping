const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
    constructor(name,email,phone,password)
    {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
      }
   static findDb(emaill, passwordd) {
       console.log(emaill, passwordd);
        const db = getDb();
    return db
    .collection('users')
    .find({email : emaill, password: passwordd})
    .next()
    .then(result => {
        return result;
    })
    .catch(err => {
        console.log(err);
    })
    }
}

module.exports = User;