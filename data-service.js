//Part 2, step 4
//delcare global arrays
var employees = [];
var departments = [];
var fs = require("fs");
//Export functions:
module.exports.initialize = function() {
    return new Promise(function(reslove, reject){
        try{
            fs.readFile('./data/employees.json', function(err, data){
                if(err) throw err;
                employees = JSON.parse(data);
            });
            fs.readFile('./data/departments.json', function(err, data){
                if(err) throw err;
                departments = JSON.parse(data);
            });
        }catch(ex){
            reject("unable to read file");
        }
        reslove("Operation was a success")
    });
}

module.exports.getAllEmployees = function(){
    var arryAllEmployees=[];
    return new Promise(function(resolve,reject){
        for (var i = 0; i < employess.length; i++) {
            arryAllEmployees.push(employess[i]);
        }
        if (arryAllEmployees.length == 0){
            reject("No result returned");
        }
    resolve(arryAllEmployees);
    })
}

module.exports.getManagers = function() {
    var arryGetManagers = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("no result return");
        }else{
            for (var q = 0; q < employess.length; q++) {
                 if (employess[q].isManager == true) {
                    arryGetManagers.push(employess[q]);       
                 }
            }
            if (arryGetManagers.length == 0) {
                     reject("no result return");
             }
        }
        resolve(arryGetManagers);
     });
}

module.exports.getDepartments = function() {
    var arryGetDepartments = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("no result return");
        }else{
            for (var v = 0; v < departments.length; v++) {
                arryGetDepartments.push(departments[v]);       
            }
            if (arryGetDepartments.length == 0) {
                reject("no result return");
            }
        }
    reslove(arryGetDepartments);    
    });
}    