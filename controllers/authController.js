const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { parse } = require("querystring");
const jwt = require("jsonwebtoken");
const secretJWT = "lsfnlNnfLnf398U";
const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

function loginGitHub(name, id, res) {
  // Create JWT
  const payload = { name: name, _id: id };
  const token = jwt.sign(payload, secretJWT, {
    algorithm: "HS256",
    expiresIn: 5000,
  });
  // Write token to cookie
  res.writeHead(302, {
    Location: "/",
    "Set-Cookie": "token=" + token + "; Path=/",
  });

  res.end();
}

exports.getLogin = (req, res) => {
  let ejsContent = fs.readFileSync(
    path.join(__dirname, "..", "views/login.ejs"),
    "utf-8"
  );
  let htmlRenderized = ejs.render(ejsContent, { filename: "views/login.ejs" });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlRenderized);
};

exports.postLoginGithub = (req, res, userData, access_token) => {
  // If user with access_token exists then login, else register
  console.log(userData.id);
  User.findByToken(userData.id).then((result) => {
    console.log(result);
    if (result) {
      // Login
      console.log("Exista userul deja!");
      loginGitHub(result.name, result._id, res);
    } else {
      console.log("Nu exista userul!");
      // Register
      // console.log(userDataJson);
      let user = new User(userData.name, null, null, null, userData.id)
        .save()
        .then((response) => {
          let userModel = response.ops[0];
          // console.log("User created");
          loginGitHub(userModel.name, userModel._id, res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

exports.postLogin = (req, res) => {
  let body = "";
  req.on("data", (item) => {
    body += item.toString();
  });
  req.on("end", () => {
    let obj = parse(body);
    User.findDb(obj.email_log).then((result) => {
      if (result) {
        bcrypt
          .compare(obj.password_login, result.password)
          .then((doMatch) => {
            if (doMatch) {
              const payload = { name: result.name, _id: result._id };
              const token = jwt.sign(payload, secretJWT, {
                algorithm: "HS256",
                expiresIn: 5000,
              });
              // Write token to cookie
              res.writeHead(302, {
                "Set-Cookie": "token=" + token,
                Location: "/",
              });
              console.log("Login successful");
              return res.end();

            } else {
              // req.flash('error', 'Invalid email or password.');
              res.writeHead(302, {
                Location: "/",
              });
              console.log("Login unsuccessful");
              return res.end();
            }
          })
          .catch((err) => {
            console.log(err);
            res.writeHead(302, {
              Location: "/login",
            });
            return res.end();
          });
      } else {
        //eroare, user nu exista
        res.writeHead(302, {
          Location: "/",
        });
        console.log("Login unsuccessful");
        return res.end();
      }
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
    User.findDb(obj.email)
      .then((result) => {
        if (result) {
          // user exist
          // req.flash('error', 'E-Mail exists already, please pick a different one.');
          res.writeHead(302, {
            Location: "/login",
          });
        } else {
          return bcrypt
            .hash(obj.password, 12)
            .then((hashedPassword) => {
              let user = new User(
                obj.name,
                obj.email,
                obj.phone,
                hashedPassword
              )
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
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
    expiresIn: 0,
  });
  // Write token to cookie
  res.writeHead(302, {
    "Set-Cookie": "token=" + token,
    Location: "/",
  });

  res.end();
};

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
  } catch (e) {
    // Invalid token
    return false;
  }

  // Valid token
  return true;
};

function parseCookies(req) {
  var list = {},
    rc = req.headers.cookie;

  rc &&
    rc.split(";").forEach(function (cookie) {
      var parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });

  return list;
}
exports.getCurrentUser = (req) => {
  const token = parseCookies(req).token;

  // Do a try - catch
  let payload = jwt.verify(token, secretJWT);
  return { _id: payload._id, _name: payload.name };
};
