const { parse } = require("querystring");
const clientSecret = "52e21141e3dd5a6e4274ae6dd45ca3d9dc1fd187";
const clientId = "d0a7b855a7390374ae5c";
const fetch = require('node-fetch');
const authController = require("./authController");

exports.getCallback = (req, res) => {
    let code = req.url.split("=")[1];
    fetch("https://github.com/login/oauth/access_token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        },
        body: `client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
    }).then(data => data.json())
        .then(dataJson => {
            const access_token = dataJson.access_token;
            // Another fetch for user informations
            fetch("https://api.github.com/user", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'token ' + access_token
                }
            }).then(userData => userData.json())
                .then(userDataJson => {
                    authController.postLoginGithub(req, res, userDataJson, access_token);
                })
        })
    console.log("Sunt la final de callback");
}