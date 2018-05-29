var sqlDB = require("mssql");
var setting = require("../settings");

exports.executeSql = function (sql, callback) {
    var conn = new sqlDB.ConnectionPool(setting.dbConfig);
    
    conn.connect()
    .then(function () {
        var req = new sqlDB.Request(conn);
        req.query(sql)
        .then(function (recordset) {
            callback(recordset, 0);
        })
        .catch(function (err) {
            console.log(err);
            callback(null, err);
        })
    })
    .catch(function (err) {
        console.log(err);
        callback(null, err);
    });
};