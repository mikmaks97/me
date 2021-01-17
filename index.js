const express = require("express");
const path = require("path");
const matter = require("gray-matter");
const md = require("markdown-it")();
const fs = require("fs");
const { four_o_four } = require("./utils");


const port = 3000;
const app = express();

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// logging middleware
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// routes
app.get("/:post", (req, res) => {
  // read the markdown file
  try {
    const file = matter.read(path.join(__dirname, "posts", `${req.params.post}.md`));
  } catch(err) {
    four_o_four(req, res);
    return;
  }

  // use markdown-it to convert content to HTML
  const content = md.render(file.content);

  res.render("post", {content, ...file.data})
});

app.get("/", (req, res) => {
  const posts = fs.readdirSync(path.join(__dirname, "posts")).filter(file => file.endsWith(".md"));
  res.render("index", {
    posts: posts
  });
});

app.listen(port, function() {
  console.log(`Server running at http://:${port}/`)
});
