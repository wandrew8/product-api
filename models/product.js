const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, index: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    subtitle: { type: String },
    mainImage: { type: String, required: true },
    imageGallery: [String],
    size: { type: String, required: true },
    ingredients: [String],
    allergens: [String],
    packageDescription: { type: String, required: true },
    packageType: { type: String, required: true },
    country: { type: String, required: true },
    price: { type: String, required: true },
    inventory: { type: Number, required: true },
    dateAdded: { type: Date, default: Date.now()}
});

productSchema.index({ name: "text" });
module.exports = mongoose.model("products", productSchema);