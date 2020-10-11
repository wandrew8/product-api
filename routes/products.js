const { Router } = require("express");
const router = Router();

const productDAO = require("../daos/product");

// GET /products/:name Retrieves a specific product
router.get("/:name", async (req, res, next) => {
  const name = req.params.name;
  const product = await productDAO.getProduct(name);
  res.json(product);
});

router.get("/add-item", (req, res, next) => {
    const query = req.query;
    console.log(query);
})

//GET /products Retrieves all products
router.get("/", async (req, res, next) => {
    let { page } = req.query;
    page = page ? Number(page) : 1;
    const products = await productDAO.getAll(page);
    res.json(products);
});

router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { category, name, description, subtitle, mainImage, imageGallery, size, ingredients, allergens, packageDescription, packageType, country, price, inventory } = req.body;
    const update = {
        category,
        name,
        description, 
        subtitle, 
        mainImage, 
        imageGallery, 
        size,
        ingredients,
        allergens,
        packageDescription,
        packageType,
        country,
        price,
        inventory
    }
    const updatedProduct = await productDAO.updateProduct(id, update);
    res.json(updatedProduct);
})

router.post("/", async (req, res, next) => {
    const { category, name, description, subtitle, mainImage, imageGallery, size, ingredients, allergens, packageDescription, packageType, country, price, inventory } = req.body;
    const newProduct = {
        category,
        name,
        description, 
        subtitle, 
        mainImage, 
        imageGallery, 
        size,
        ingredients,
        allergens,
        packageDescription,
        packageType,
        country,
        price,
        inventory
    }
    const product = await productDAO.addProduct(newProduct);
    res.json(product);
})


module.exports = router;