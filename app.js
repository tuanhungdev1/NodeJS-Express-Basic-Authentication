const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3000;

app.use(bodyParser.json());

const users = [
  { username: "user", password: "1234" },
  { username: "user2", password: "password2" },
];

// Middleware xac thuc Basic Authentication
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (authHeader) {
    const credentials = Buffer.from(authHeader.slice(6), "base64")
      .toString()
      .split(":");

    const username = credentials[0];
    const password = credentials[1];

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      return next();
    }
  }

  res.setHeader("WWW-Authenticate", 'Basic realm="example"');
  res.status(401).send("Authentication required");
};

app.get("/", basicAuth, (req, res) => {
  res.send("Susscess...");
});

app.get("/", (req, res) => {
  res.send("Home Page...");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
