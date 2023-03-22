const fs = require('fs');
const express= require('express');
const app = express();
app.use(express.static('uploads'));

const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"

const getProductDetails = (req,res)=>{

    const itemId = req.params.itemId;

    let theFile;
    let theFile2;
    fs.readFile(__dir + '/products.json','utf-8',(err,data)=>{

        if(data.length === 0) {
            // res.json({isEmpty:true, theFile2:[]});
            theFile = [];
            res.send("products empty");
        }
        else{
            theFile = JSON.parse(data);
            let product = undefined;
            for(let i = 0; i<theFile.length;i++){
                if(theFile[i].id == itemId){
                    product = theFile[i];
                    break
                }
            }
            if(!product){
                res.send("some issue.. product id not found in productsData")
            }else{
                console.log(product);
                // rending product details page
                res.render('productDetails', {product:product});
            }
        }
    });


    // res.send(":)")
}

module.exports = getProductDetails;