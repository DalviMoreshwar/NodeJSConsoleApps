var db = require("../core/db");
var util = require("util");

var alerts = require("../core/httpMsgs");


exports.getList = function (req, res) {
    db.executeSql("SELECT * FROM employee", function (recordset, err) {
        if (err) {
            alerts.show500(req, res, err);
        } else {
            alerts.sendJson(req, res, recordset);
        }
        
    });

};

exports.get = function (req, res, id) {
    db.executeSql("SELECT * FROM employee WHERE id =" + id, function (recordset, err) {
        if (err) {
            alerts.show500(req, res, err);
        } else {
            alerts.sendJson(req, res, recordset);
        }
        
    });
};

exports.add = function (req, res, reqBody) {
    
    try {
        if (!reqBody) throw new Error("input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO employee (empname, salary, address) VALUES ";
            sql += util.format("('%s', %d, '%s')", data.empname, data.salary, data.address);
            db.executeSql(sql, function (recordset, err) {
                if (err) {
                    alerts.show500(req, res, err);
                } else {
                    //alerts.show200(req, res);
                    db.executeSql("SELECT * FROM employee", function (recordset, err) {
                        if (err) {
                            alerts.show500(req, res, err);
                        } else {
                            alerts.sendJson(req, res, recordset);
                        }
        
                    });
                }
        
            });
        } else {
            alerts.show500(req, res, err);
        }

    } catch (ex) {
        alerts.show500(req, res, err);
    }

};

exports.update = function (req, res, reqBody) {
    try {
        if (!reqBody) throw new Error("input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            
            if (!data.id) throw new Error("ID is not provided");
            
            var sql = "UPDATE employee SET";
            
            var isDataProvided = false;
            
            if (data.empname) {
                sql += " empname = '" + data.empname + "',";
                isDataProvided = true;
            }
            
            if (data.salary) {
                sql += " salary = " + data.salary + ",";
                isDataProvided = true;
            }
            
            if (data.address) {
                sql += " address = '" + data.address + "',";
                isDataProvided = true;
            }
            
            sql = sql.slice(0, -1); //REMOVE COMMA
            sql += "WHERE id = " + data.id;
            
            db.executeSql(sql, function (recordset, err) {
                if (err) {
                    alerts.show500(req, res, err);
                } else {
                    //alerts.show200(req, res);
                    db.executeSql("SELECT * FROM employee", function (recordset, err) {
                        if (err) {
                            alerts.show500(req, res, err);
                        } else {
                            alerts.sendJson(req, res, recordset);
                        }
        
                    });
                }
        
            });
        } else {
            alerts.show500(req, res, err);
        }

    } catch (ex) {
        alerts.show500(req, res, err);
    }
};

exports.delete = function (req, res, id) {
    db.executeSql("DELETE FROM employee WHERE id =" + id, function (recordset, err) {
        if (err) {
            alerts.show500(req, res, err);
        } else {
            db.executeSql("SELECT * FROM employee", function (recordset, err) {
                if (err) {
                    alerts.show500(req, res, err);
                } else {
                    alerts.sendJson(req, res, recordset);
                }
        
            });
        }
        
    });
};