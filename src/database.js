const Pool = require("pg").Pool;


const pool = new Pool({
    user: "hpnkpouv",
    password: 'USPPA2T9lu8nYCA7kEwlTcqGn91aA6Ic',
    database: 'hpnkpouv',
    host: 'kesavan.db.elephantsql.com',
    port: 5432
});
module.exports=pool;