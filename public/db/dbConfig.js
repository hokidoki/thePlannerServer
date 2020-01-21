var mysql = require('mysql');
var config = require('./dbInfo.js').local;

module.exports = function(){
    return {
        init : function(){
            return mysql.createConnection({
                host : config.host,
                port : config.port,
                user : config.user,
                password : config.password,
                database : config.database
            })
        },
        test_open : function (con){
            con.connect(function(err){
                if(err){
                    console.log("mysql connection error" + err);
                }else{
                    console.log("mysql is connected successfully");
                }
            })
        }
    }
}