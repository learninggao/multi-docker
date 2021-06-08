const { Client, Pool } = require("pg");
const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});
(async () => {
  console.log("a");
  // client.connect();
  client.on("connect", () => {
    console.log("connected to postgres");
  });
  console.log("here");
  const res = await client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  console.log(res.rows[0].message); // Hello world!
  await client.end();
})();
