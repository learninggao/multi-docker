const keys = require("./keys");

// Express App Setup
const express = require("express");
const cors = require("cors");
const { Pool, Client } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Postgres Client Setup
const pgClient = new Pool({
  user: "postgres",
  host: "db",
  database: "postgres",
  password: "password",
  port: 5432,
});

// Redis Client Setup
// const redis = require("redis");
// const redisClient = redis.createClient({
//   host: keys.redisHost,
//   port: keys.redisPort,
//   retry_strategy: () => 1000,
// });
// const redisPublisher = redisClient.duplicate();

// Express route handlers

const myCache = {};

app.get("/", (req, res) => {
  res.send("His");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");

  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  res.send(myCache);
});

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

app.post("/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }
  console.log("index", index);
  // redisClient.hmset("values", index, "Nothing yet!");
  // redisPublisher.publish("insert", index);
  let value;
  if (myCache[index]) {
    res.sendStatus(200);
  } else {
    value = fib(parseInt(index));
    myCache[index] = value;
  }
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});

(async () => {
  await pgClient.query("CREATE TABLE IF NOT EXISTS values (number INT)");
  app.listen(5000, (err) => {
    console.log("Listening");
  });
})();
