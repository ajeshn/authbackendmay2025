const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    // console.log("no headers");
    return res.status(401).send("unauthorised request no headers");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    // console.log("null token");
    return res.status(401).send("unauthorised request null");
  }
  let payload = jwt.verify(token, "secret");
  if (!payload) {
    // console.log("no payload");
    return res.status(401).send("unauthorised request no payload");
  }
  req.userId = payload.subject;
  next();
}

router.get("/", (req, res) => {
  res.send("From Api");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user
    .save()
    .then((registeredUser) => {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, "secret");
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }).then((user) => {
    if (!user) {
      res.status(401).send("invalid email");
    } else {
      if (user.password !== userData.password) {
        res.status(401).send("incorrect password");
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secret");
        res.status(200).send({ token });
      }
    }
  });
});

router.get("/employees", (req, res) => {
  let employees = [
    {
      id: 1,
      name: "James Samuel",
      role: "Accountant",
    },
    {
      id: 2,
      name: "HariKumar",
      role: "Auditor",
    },
    {
      id: 3,
      name: "Rahana",
      role: "clerk",
    },
  ];
  res.json(employees);
});

router.get("/managers", verifyToken, (req, res) => {
  let managers = [
    {
      id: 1,
      name: "James Samuel",
      role: "IT Manager",
    },
    {
      id: 2,
      name: "HariKumar",
      role: "Accounts Manager",
    },
    {
      id: 3,
      name: "Rahana",
      role: "Manager",
    },
  ];
  res.json(managers);
});

module.exports = router;
