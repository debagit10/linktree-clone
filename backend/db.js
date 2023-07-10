const POOL = require("pg").Pool;

const pool = new POOL({
  user: "postgres",
  password: "osedebajay",
  host: "localhost",
  port: 5432,
  database: "linktree",
});

module.exports = pool;
