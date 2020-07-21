const {Pool} = require('pg')

module.exports = new Pool({
    user: "postgres",
    password: "12091997",
    host: "localhost",
    port: 5432, 
    database: "gymmanager"
})