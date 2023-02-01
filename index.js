const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const connection = require("./config/db");
const authRoute = require("./routes/auth");
const EventModel = require("./models/EventModel");
require("dotenv").config();
require("./passport");

const app = express();
// const PORT = process.env.PORT || 8080;

app.use(
  cookieSession({
    name: "mysession",
    keys: ["suraj"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(
  cors({credentials: true})
);

app.use("/auth", authRoute);

// event creating route

app.post("/event/create", async (req, res) => {
  let data = EventModel(req.body);
  try {
    await data.save();
    res.send({ status: 200, msg: "event created" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong");
  }
});

app.get("/", (req, res) => {
  res.send("Homepage");
});

// all event finding route
app.get("/event", async (req, res) => {
  console.log(req.query);
  let data;
  if (req.query) {
    data = await EventModel.find(req.query);
  } else {
    data = await EventModel.find();
  }
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(401).send("something went wrong");
  }
});

app.listen("8080", async () => {
  try {
    await connection;
    console.log("connected to  db");
  } catch (err) {
    console.log(err);
  }
  console.log(`server is running on 8080`);
});
