const mariadb = require("mariadb");

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    dabatase: process.env.DATABASE,
    connectionLimit: process.env.CONN_LIMIT,
    };

    const  pool = mariadb.createpool(config);

    module.exports = pool;
    