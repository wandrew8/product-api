const { Router } = require("express");
const router = Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

router.use("/products", require('./products'));

router.use("/", async (req, res, next) => {
  res.send("Welcome to the World Treats Products API")
});


module.exports = router;