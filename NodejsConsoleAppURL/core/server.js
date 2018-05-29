var http = require("http");
var sqlDB = require("mssql");
var setting = require("../settings");
var emp = require("../controllers/employee");
var url = require('url');
var db = require('./db');

var server = http.createServer(function (request, response) {
    //Parse the address:
    var q = url.parse(request.url, true);
    var qdata = q.query;
    var id = qdata.id;
    var empname = qdata.empname;
    var salary = qdata.salary;
    var address = qdata.address;
    
    var Empdata = {"empname": empname, "salary": salary, "address": address, };
    //var Empdata = [empname, salary, address];
    
    switch (q.pathname || request.method) {
        
        case "/getEmployee":
            console.log("Get Request");
            emp.getList(request, response);
            break;
        case "/editEmployee":
            emp.get(request, response, id);
            console.log("Edit Request: "+ id);        
            break;
        case "/deleteEmployee":
            emp.delete(request, response, id);
            console.log("Edit Request: " + id);  
            break;
        case "/add_employees":
            if (request.url === "/add_employees") {
                var reqBody = '';
                request.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 10e7) {
                        console.log("Too large string");
                    }
                });
                request.on("end", function () {
                    emp.add(request, response, reqBody);
                });
            }  else {
                alerts.show405(request, response);
            }
            break;

        case "/update_employees":
            if (request.url === "/update_employees") {
                var reqBody = '';
                request.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 10e7) {
                        console.log("Too large string");
                    }
                });
                request.on("end", function () {
                    emp.update(request, response, reqBody);
                });
            } else {
                alerts.show405(request, response);
            }
            break;
        default:
            console.log("BAD REQUEST: " + request.method);
            break;
    }

    //if (q.pathname === "/addEmployee") {
    //    console.log("true");
        
    //    console.log("month"+month);
    //    console.log("year: "+year);
    //} else if (q.pathname === "/getEmployee") { 
    //    console.log("Get Request");
    //} else {
    //    console.log("BAD REQUEST");
    //}
});

server.listen(setting.webPort);
console.log("Started Listing at: " + setting.webPort);



//var adr = 'http://localhost:9000/addEmployee?year=2017&month=february';
////Parse the address:
//var q = url.parse(adr, true);

///*The parse method returns an object containing url properties*/
//console.log(q.host);
//console.log(q.pathname);
//console.log(q.search);

///*The query property returns an object with all the querystring parameters as properties:*/
//var qdata = q.query;
//console.log(qdata.month);
//console.log(qdata.year);