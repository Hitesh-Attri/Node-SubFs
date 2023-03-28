const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isVerified: Boolean,
    mailToken: Number,
    cart: []
});

// first arg in collection name
module.exports = mongoose.model("userDataClctn", userSchema);

console.log("collection connected");


// product data




// cart data




