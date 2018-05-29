var settings = require("../settings");

exports.show500 = function (req, res, err) {
    res.writeHead(500, "Internal error occured", { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: "500" }));
    res.end();
};

exports.show405 = function (req, res) {
    res.writeHead(405, "MD Method not supported", { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: "405" }));
    res.end();
};

exports.show404 = function (req, res) {
    res.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: "404" }));
    res.end();
};

exports.show200 = function (req, res) {
    var data = "200"
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(200));
    res.end();
};

//get data back
exports.sendJson = function (req, res, recordset) {
    res.writeHead(200, { "Content-Type": "application/json" });
    console.log(JSON.stringify(recordset.recordset));
    res.write(JSON.stringify(recordset.recordset));
    res.end();
}






  