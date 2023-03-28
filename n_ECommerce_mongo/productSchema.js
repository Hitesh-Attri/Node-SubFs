const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,
    productName: String,
    fileName: String,
    description: String,
    price: String
});

// first arg in collection name
module.exports = mongoose.model("productDataClctn", productSchema);

console.log("product collection connected");
