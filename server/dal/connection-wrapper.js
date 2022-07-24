const mysql = require("mysql2");

const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "shopdb"
    })

    connection.connect(err=>{
        if(err){
            console.log("failed to create connection" + err);
            return;
        }
        console.log("We're conncted to MySQL")
    });

    

// One function for executing select / insert / update / delete: 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, parameters, (err, result) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParameters
};