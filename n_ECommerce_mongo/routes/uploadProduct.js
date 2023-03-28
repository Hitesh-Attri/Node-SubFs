const express = require('express');
const router = express.Router();
const multer = require('multer');
const productSchema = require('../productSchema');

const upload = multer ( { 
    dest:'uploads'
})

router.post('/',upload.single('productImage'), (req,res)=>{
    console.log("product img here");
    // console.log(req.body,typeof req.body);
    let obj = new productSchema({
        id : Date.now(),
        productName:req.body.productName,
        fileName : req.file.filename,
        description : req.body.productDesc,
        price : req.body.productPrice
    })

    obj.save();

    console.log("productclctnM updated")

    res.send(req.file);
})

module.exports = router;