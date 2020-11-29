const { Router } = require("express");
const router = Router();
module.exports = {};

const productDAO = require("../daos/product");

// GET /products/:name Retrieves a specific product
router.get("/:name", async (req, res, next) => {
  const name = req.params.name;
  const product = await productDAO.getProduct(name);
  res.json(product);
});

router.get("/countries/getAll", async (req, res, next) => {
    const countries = await productDAO.getAllCountries();
    res.json(countries);
})

router.get("/countries/:category", async (req, res, next) => {
    const { category } = req.params;
    const countries = await productDAO.getCountriesByCategory(category);
    res.json(countries);
})

router.post("/add-item", async (req, res, next) => {
    const { category, name, description, subtitle, mainImage, imageGallery, size, ingredients, allergens, packageDescription, packageType, country, price, inventory } = req.body;
    const ingredientsArray = ingredients.includes(",") ? ingredients.split(",") : [ingredients];
    const allergensArray = allergens.includes(",") ? allergens.split(",") : [allergens];
    const imageGalleryArray = imageGallery.includes(",") ? imageGallery.split(",") : [imageGallery];
    const product = {
        category,
        name,
        description,
        subtitle,
        mainImage,
        imageGallery: imageGalleryArray,
        size, 
        ingredients: ingredientsArray,
        allergens: allergensArray,
        packageDescription,
        packageType,
        country,
        price, 
        inventory
    }
    const newProduct = await productDAO.addProduct(product);
    res.json(newProduct);
})

router.get("/category/:category", async (req, res, next) => {
    const { category } = req.params;
    const products = await productDAO.getByCategory(category);
    res.json(products);
})

router.get("/newproducts/:amount", async (req, res, next) => {
    const { amount } = req.params;
    const products = await productDAO.getNewProducts(amount);
    res.json(products);
})

router.get("/pages/getAll", async (req, res, next) => {
    const products = await productDAO.getAllProducts();
    const numPages = Math.ceil(products.length / 2);
    const pages = [];
    for(let i = 0; i < numPages; i++) {
        pages.push(i + 1);
    }
    console.log(numPages)
    const info = {
        totalPages: numPages,
        pages: pages,
        totalItems: products.length
    }
    res.json(info)
})

//GET /products Retrieves all products
router.get("/", async (req, res, next) => {
    let { page } = req.query;
    let products;
    if (page) {
        products = await productDAO.getAll(page);
    } else {
        products = await productDAO.getAllProducts();
    }
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
        inventory,
        dateAdded: Date.now()
    }
    const product = await productDAO.addProduct(newProduct);
    res.json(product);
})

router.delete("/remove/:id", async (req, res, next) => {
    const { id } = req.params;
    const deletedItem = await productDAO.deleteOne(id);
    res.json(deletedItem);
})


module.exports = router;