const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const snowflake = require("snowflake-sdk");

const app = express();
const port = process.env.PORT || 3000;
// process.env.PORT ||
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Snowflake connection
const connection = snowflake.createConnection({
  account: "kiuqdga-hi07006",
  username: "ahsankbh",
  password: "Goldengang25*",
  database: "replit_testing",
  schema: "auth",
});

connection.connect((err, conn) => {
  if (err) {
    console.error("Unable to connect to Snowflake:", err);
    return;
  }
  console.log("Successfully connected to Snowflake!");
});

// Signup route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists
  connection.execute({
    sqlText: `SELECT 1 FROM users WHERE email = ?`,
    binds: [email],
    complete: (err, stmt, rows) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (rows.length > 0) {
        return res.status(409).json({ error: "Email already exists" });
      }

      // Insert the user
      connection.execute({
        sqlText: `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        binds: [name, email, password],
        complete: (err) => {
          if (err) {
            console.error("Error creating user:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(201).json({ message: "User created successfully" });
        },
      });
    },
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.execute({
    sqlText: `SELECT email, password FROM users WHERE email = ? AND password = ?`, // Modified SQL query
    binds: [email, password],
    complete: (err, stmt, rows) => {
      if (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (rows.length > 0) {
        res
          .status(200)
          .json({ email: rows[0].email, password: rows[0].password }); // Returning email and password
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    },
  });
});

app.get("/home", async (req, res) => {
  try {
    const email = req.query.email; // Get the email from the query parameter
    const userData = await getUserData(email);
    res.status(200).json(userData);
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
const getUserData = (email) => {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText: `SELECT name, email, password, created_at FROM users WHERE email = ?`, // Use the email for the query
      binds: [email],
      complete: (err, stmt, rows) => {
        if (err) {
          console.error("Error fetching user data:", err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error("User not found"));
        } else {
          resolve(rows[0]);
        }
      },
    });
  });
};
// ... rest of your code

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});