const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"

const upload = multer ( { 
    dest:'uploads'
})

router.post('/',upload.single('productImage'), (req,res)=>{
    console.log("product img here");
    // console.log(req.file);
    // console.log(req.body,typeof req.body);
    let obj = {
        id : Date.now(),
        productName:req.body.productName,
        fileName : req.file.filename,
        description : req.body.productDesc,
        price : req.body.productPrice
    }
    let theProducts;
    fs.readFile(__dir +"/products.json",'utf-8',(err,data)=>{
        if(data.length === 0) theProducts = [];
        else{
            theProducts = JSON.parse(data);
        }
        theProducts.push(obj);
        fs.writeFile(__dir+'/products.json', JSON.stringify(theProducts),(err)=>{
            console.log("products.json updated")
        })
    })
    res.send(req.file);
})

module.exports = router;