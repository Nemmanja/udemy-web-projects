import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// In-memory storage
let posts = [];
let nextId = 1;

// GET home page
app.get("/", (req, res) => {
  const editId = parseInt(req.query.editId);
  let editPost = null;
  if (editId) {
    editPost = posts.find(p => p.id === editId);
  }
  res.render("index", { posts, editPost });
});

// POST new post or edit existing
app.post("/posts", (req, res) => {
  const { title, excerpt, content, editId } = req.body;

  if (!title || !content) {
    return res.redirect("/");
  }

  if (editId) {
    // Edit existing post
    const post = posts.find(p => p.id === parseInt(editId));
    if (post) {
      post.title = title;
      post.excerpt = excerpt || "";
      post.content = content;
    }
  } else {
    // Create new post
    const newPost = { id: nextId++, title, excerpt: excerpt || "", content, date: new Date() };
    posts.unshift(newPost);
  }

  res.redirect("/");
});

// POST delete
app.post("/posts/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.redirect("/");
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

