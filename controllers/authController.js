const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { parse } = require("querystring");
const jwt = require('jsonwebtoken');
const secretJWT = 'lsfnlNnfLnf398U';

const User = require("../models/user");

exports.getLogin = (req, res) => {
  let ejsContent = fs.readFileSync(
    path.join(__dirname, "..", "views/login.ejs"),
    "utf-8"
  );
  let htmlRenderized = ejs.render(ejsContent, { filename: "views/login.ejs" });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlRenderized);
};

exports.postLogin = (req, res) => {
  let body = "";
  req.on("data", (item) => {
    body += item.toString();
  });
  req.on("end", () => {
    let obj = parse(body);
    User.findDb(obj.email_log, obj.password_login).then((result) => {
      if (result) {
        // Create JWT
        const payload = { name: result.name , _id: result._id}
        const token = jwt.sign(payload, secretJWT, {
          algorithm: "HS256",
          expiresIn: 5000
        });
        // Write token to cookie
        res.writeHead(302, {
          'Set-Cookie': 'token=' + token,
          'Location': '/'
        });

        console.log("Login successful");
      }
      else {
        res.writeHead(301, {
          'Location': '/'
        });
        console.log("Login unsuccessful");
      }

      res.end();
    });
  });
};

exports.postRegister = (req, res) => {
  let body = "";
  req.on("data", (item) => {
    body += item.toString();
  });
  req.on("end", () => {
    let obj = parse(body);
    console.log(obj);
    let user = new User(obj.name, obj.email, obj.phone, obj.password)
      .save()
      .then((result) => {
        console.log("User created");
        res.writeHead(302, {
          Location: "/login",
        });
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.logOut = (req, res) => {
  // Set token expiration time to 0
  const token = jwt.sign({ msg: "expired" }, secretJWT, {
    algorithm: "HS256",
    expiresIn: 0
  });
  // Write token to cookie
  res.writeHead(302, {
    'Set-Cookie': 'token=' + token,
    'Location': '/'
  });

  res.end();

}

exports.getRegister = (req, res) => {
  let ejsContent = fs.readFileSync(
    path.join(__dirname, "..", "views/register.ejs"),
    "utf-8"
  );
  let htmlRenderized = ejs.render(ejsContent, {
    filename: "views/register.ejs",
  });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlRenderized);
};

exports.isLoggedIn = (req) => {
  const token = parseCookies(req).token;

  // console.log(token);

  if (!token) {
    // console.log("trimit false;")
    return false;
  }

  let payload;

  try {
    payload = jwt.verify(token, secretJWT);
  }
  catch (e) {
    // Invalid token
    return false;
  }

  // Valid token
  return true;
}

function parseCookies(req) {
  var list = {},
    rc = req.headers.cookie;

  rc && rc.split(';').forEach(function (cookie) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}
exports.getCurrentUser = req => {
  const token = parseCookies(req).token;
  let payload = jwt.verify(token, secretJWT);
  return { _id: payload._id , _name: payload.name};
}