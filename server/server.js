const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const bodyParser = require("bodyParser");
const tempAdminRouter = require("./router/tempUsers");
const UserRouter = require("./router/usersRoute");
// read json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
});

// middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// Middleware for setting security headers
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "Deny");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=3153600; includeSubDomains; preload"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    next();
  }
});
//   serving static files ~ serving 404
app.use(express.static(path.join(__dirname, "public")));

// routers
app.use(tempAdminRouter);
app.use(UserRouter);

// 404 Handler ~ Acceptance formats
app.use((req, res, next) => {
  // loging events
  logEvent(`"Not Found" ${req.method} ${req.path}`, "errorLog.log");
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "Not found" });
  } else {
    res.type("txt").send("Not found");
  }
});

const PORT = process.env.PORT_PRIVATE || 5060;

app.listen(PORT, () => {
  console.log("Running on port ", PORT);
});
