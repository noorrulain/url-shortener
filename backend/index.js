import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
});

db.connect();

app.post("/add", async (req, res) => {
  const new_url = req.body.url;
  console.log(req.body);
  let short_url;
  const result = await db.query("SELECT * FROM short_url");
  if (result.rows.length === 0) {
    short_url = 1;
  } else {
    short_url = result.rows[result.rows.length - 1].short_url + 1;
  }
  await db.query("INSERT INTO short_url(url, short_url) VALUES ($1, $2)", [
    new_url,
    short_url,
  ]);
  res.json(short_url);
});

app.get("/url/:url", async (req, res) => {
  //   const short_url = req.params;
  //   console.log(short_url);
  //   console.log(req.params.url);
  const short_url = req.params.url;
  console.log(short_url);
    const result = await db.query(
      "SELECT url FROM short_url WHERE short_url = $1",
      [short_url]
    );
    if (result.rows.length === 0) {
      res.sendStatus(404);
    } else {
      const complete_url = result.rows[0].url;
      res.redirect(301, `${complete_url}`);
      //res.send('OK');
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
