require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const pool = require("./db");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Test working");
});

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rows.length) {
      res.json({ error: "User exists" });
    }
    const signup = await pool.query(
      "INSERT INTO users(username,email, password) VALUES($1, $2, $3)",
      [username, email, hashed_password]
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token, username });
  } catch (error) {
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log(users);

    if (!users.rows.length) {
      res.json({ detail: "User does not exist" });
    }

    const success = await bcrypt.compare(password, users.rows[0].password);
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    console.log(success);

    if (success) {
      res.json({
        email: users.rows[0].email,
        token,
        name: users.rows[0].username,
      });
    } else {
      res.json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/add", async (req, res) => {
  const { url, title, user_email } = req.body;
  const id = uuidv4();
  try {
    const newTodo = pool.query(
      "INSERT INTO links(id, url, title, user_email) VALUES($1, $2, $3, $4)",
      [id, url, title, user_email]
    );
    if (newTodo) {
      res.json({ success: "Added" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/links", async (req, res) => {
  const { userEmail } = req.body;
  try {
    const links = await pool.query(
      "SELECT * FROM links WHERE user_email = $1",
      [userEmail]
    );

    if (links) {
      res.json(links.rows);
    } else {
      res.send("no links found");
    }
  } catch (error) {
    console.error(error);
  }
});

app.put("/link/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, url } = req.body;
  try {
    const editLink = await pool.query(
      "UPDATE links SET url = $1, title = $2, user_email = $3 WHERE id = $4",
      [url, title, user_email, id]
    );
    res.json(editLink);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/link/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteLink = await pool.query("DELETE FROM links WHERE id = $1;", [
      id,
    ]);
    res.json(deleteLink);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, console.log(`Server listeing on PORT ${PORT}`));
