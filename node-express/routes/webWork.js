const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('webWorker');
});

let num = 0;
router.get("/getData", (req, res) => {
  num += 1;
  console.log(num);
  res.status(200).json({ success: true, num });
});

module.exports = (app) => {
  app.use('/webWorker', router);
};


