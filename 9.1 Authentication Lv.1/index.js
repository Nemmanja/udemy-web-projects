import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "Laki2020",
  port: 5432
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  res.render("secrets.ejs");
})

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await db.query("INSERT INTO users VALUES ($1, $2)", [username, password]);
  res.redirect("/secrets");
});
  

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username) {
    return res.redirect("/login");
  }
  try {
    const result = await db.query("SELECT password FROM users WHERE username = $1",[username]);
    if (result.rows.length === 0) {
      return res.redirect("/register");
    }
    const storedPassword = result.rows[0].password;
    if (storedPassword === password) {
      res.redirect("/secrets");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
