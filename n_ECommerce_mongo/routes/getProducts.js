const express = require('express');
const router = express.Router();
const productSchema = require('../productSchema');

router.post('/',async (req,res)=>{
    // console.log(req.body, typeof req.body);
    let i = req.body.curr;
    // console.log(i," < getProducts, rqst from load morescript");

    let products = await productSchema.find();
    // console.log(products,typeof products," < getProducts.js routes");

    if( i < products.length ){
        products = products.slice(i,i+5);
        res.json({isEmpty: false, theFile2: products});
    }
    else{
        res.json({isEmpty:true, theFile2: []});
    }
})

module.exports = router;