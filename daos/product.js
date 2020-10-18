const Product = require("../models/product");

module.exports = {};

module.exports.getAll = async (page) => {
  if (page > 0) {
    return await Product.find()
      .limit(20)
      .skip(20 * (page - 1))
      .lean();
  } else {
    return await Product.find()
      .limit(20)
      .skip(20 * page)
      .lean();
  }
};

module.exports.getProduct = async (name) => {
  const formattedName = name.split("-").join(" ");
  return await Product.findOne({ name: formattedName }).lean();
};

module.exports.getAllCountries = async () => {
  return await Product.distinct( "country" )

}

module.exports.getCountriesByCategory = async (category) => {
  return await Product.distinct( "country", { category: category } )
}

module.exports.searchProduct = async (string) => {
  const products = await Product.find(
    { $text: {$search: string}},
    { score: {$meta: "textScore"}}
    )
    .sort({ score: { $meta: "textScore" }})
    .limit(20).lean();
  return products;
};

module.exports.addProduct = async(data) => {
    return  await Product.create(data);
}

module.exports.updateProduct = async(id, data) => {
    return await Product.updateOne(
        { _id: id },
        {
        $set: data,
        $currentDate: { lastModified: true }
        })
}

module.exports.getByCategory = async(category) => {
  return await Product.find({ category: category });
}

module.exports.deleteOne = async(id) => {
  return await Product.findByIdAndDelete(id)
}