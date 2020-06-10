const express = require("express");
const router = express.Router();

const user = { name: "zlx" };

router.get("/", (req, res) => {
  req.session.user = user;
  res.status(200).json({ success: true, content: "login success!" });
});

router.get("/out", (req, res) => {
  req.session.user = null;
  res.status(200).json({ success: true, content: "login out success!" });
});

router.get("/getUser", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ success: true, content: user });
  } else {
    res.status(200).json({ success: false, content: null });
  }
});

module.exports = (app) => {
  app.use("/login", router);
};
