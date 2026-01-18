import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var imePrezime = "";

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.post("/submit", (req, res) => {
  imePrezime = req.body["ime"] + " " + req.body["prezime"];
  res.send(`<h1>${imePrezime}</h1>`);
})

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
})


