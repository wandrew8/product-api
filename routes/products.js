const { Router } = require("express");
const router = Router();

const productDAO = require("../daos/product");

// GET /products/:name Retrieves a specific product
router.get("/:name", async (req, res, next) => {
  const name = req.params.name;
  const product = await productDAO.getProduct(name);
  res.json(product);
});

//GET /products Retrieves all products
router.get("/", async (req, res, next) => {
    let { page } = req.query;
    page = page ? Number(page) : 1;
    const products = await productDAO.getAll(page);
    res.json(products);
});

module.exports = router;