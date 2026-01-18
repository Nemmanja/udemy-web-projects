import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "booknotes",
    password: "Laki2020",
    port: 5432
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notes ORDER BY id ASC")
        let notes = result.rows;
        res.render("index.ejs", {
            books: notes,
        });
    } catch (err) {
        console.log(err);
    }
})

app.post("/add", async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    let lastId = (await db.query("SELECT MAX(id) AS lastId FROM notes")).rows[0].lastid;
    lastId++;
    try {
        await db.query("INSERT INTO notes VALUES ($1, $2, $3)", [lastId, title, content]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.post("/edit", async (req, res) => {
    const id = req.body.updatedId;
    const title = req.body.updatedTitle;
    const content = req.body.updatedContent;
    try {
        await db.query("UPDATE notes SET title = ($1), content = ($2) WHERE id = $3", [title, content, id]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.post("/delete", async (req, res) => {
    const id = req.body.deletedId;
    try {
        await db.query("DELETE FROM notes WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});