const { Router } = require("express");
const router = Router();
const bodyParser = require('body-parser');
const productDAO = require("../daos/product");
const cors = require("cors");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
router.use("/products", require('./products'));

router.use("/all", async (req, res, next) => {
  const products = await productDAO.getAll();
  res.render("products", { products: products });
})

router.use("/", async (req, res, next) => {
  res.render("home")
});



module.exports = router;