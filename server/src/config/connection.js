const db_config = require("./database").db;
const mysql = require("mysql");

module.exports = {
    connection: mysql.createConnection(db_config),
    route: '/api/'
}