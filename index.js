const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const express = require("express");
const path = require("path");

const app = express();
let dbPath = path.join(__dirname, "goodreads.db");
let db;

(async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.get("/", (req, res) => {
      res.send("Successfully running the server");
    });
  } catch (err) {
    console.log(`DB error: ${err.message}`);
    process.exit(1);
  }
})();

// getBooks API
app.get("/books/", async (req, res) => {
  const booksQuery = `SELECT * FROM book WHERE book_id <= 10 ORDER BY book_id;`;
  const booksArr = await db.all(booksQuery);
  res.send(`${booksArr}`);
  //console.log(booksArr);
});

app.listen(3000, () => {
  console.log("Server started at: http://localhost:3000/");
});
