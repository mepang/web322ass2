/*********************************************************************************
*  WEB322 –Assignment02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _____Matthew Pang_____ Student ID: __028582153___ Date: __Oct. 3, 2018_____
*
*  Online (Heroku) Link: 
*
********************************************************************************/
var data_service = require("./data-service.js"); 
var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
var path = require("path");

//call this function after http server start listening for requests
 function onHTTpStart() {
     console.log("Express http server listening on: " + HTTP_PORT);
 }

//setup a "route" to listen on the default url path (http//localhost)
 app.get("/", function(req, res) {
     res.sendFile(path.join(__dirname, "/views/home.html"));
 });

//setup 2nd route to listen on /about
app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});
//part 2, step 3: Adding additional Routes:
app.get("/employees", function(req, res) {
    if(req.query.status) {
        data_service.getEmployeesByStatus(req.query.status).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json({message: err});
        });
    }else if(req.query.deparment) {
        data_service.getEmployeesByDepartment(req.query.department).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json({message: err});
        });
    }else if(req.query.manager){
        data_service.getEmployeesByManager(req.query.manager).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json({message: err});
        });
    }else{
        data_service.getEmployees().then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json({message: err});
        });
    }
});

app.get("/managers", function(req,res){
    data_service.getManagers().then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json({message: err});
    });
});

app.get("/departments", function(req,res){
    data_service.getDepartments().then(function(data){
      res.json(data);
    }).catch(function(err){
      res.json({message: err});
    });
});

app.use(function(req, res) {
    res.status(404).send("Page Not Found");
  });
//setup h1ttp server to listen on HTTP_PORT
//Part 2, Step 5:(updating)
app.listen(HTTP_PORT, function(res,req){
   console.log("Express http server listening on: " + HTTP_PORT);
   data_service.initialize().then(function(data){
       console.log(data)
     }).catch(function(err){
       console.log(err);
     });
});

//"static" middleware must be used
app.use(express.static('public'));