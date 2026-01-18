import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    const danas = new Date();
    const dan = danas.getDay();
    res.render("index.ejs", {dayType: "a weekday", advice: "time to work hard"});
});

app.listen(port, () => {
    console.log(port);
})
