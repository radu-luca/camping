const path  = require('path');
const fs = require('fs');
exports.getHome = () => {
    var test = "asda";
fs.readFile(path.join(__dirname,"..","views/index.html"),
(err,data) => {
    return data.toString();
});
return test;
};
