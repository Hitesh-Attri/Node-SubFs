const express = require('express');
const router = express.Router();
const fs = require('fs');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"

// router.use(express.json());

router.get('/',(req,res)=>{
    console.log(req.body,"< in get");
    fs.readFile(__dir+"/cart.json",'utf-8', (err,data)=>{
        if(data.length === 0) products = [];
        else products = JSON.parse(data);
        // console.log(products, typeof products);
        res.render('cartPage', {username : req.session.username, loggedIn: req.session.is_logged_in, products: products}) 
    })
})

router.post('/',(req,res)=>{
    console.log("imsA >",req.body)
    // add to cart here
    let theProductFile;
    let theCartFile;

    fs.readFile(__dir +'/cart.json','utf-8',(err2,data2)=>{
        if(data2.length == 0) theCartFile =[]
        else  theCartFile = JSON.parse(data2);
        
        for(let i = 0 ; i < theCartFile.length;i++){
            if(theCartFile[i].id == req.body.productId){
                res.json({msg:"Item already in cart!"});
                return;
            }
        }

        fs.readFile(__dir +'/products.json','utf-8',(err,data)=>{

            if(data.length === 0) theFile = []
            else{
                theProductFile = JSON.parse(data);
    
                for(let i = 0;i < theProductFile.length;i++){
                    if(theProductFile[i].id == req.body.productId){

                        let cartItemObj = {
                            id: theProductFile[i].id,
                            productName : theProductFile[i].productName,
                            fileName : theProductFile[i].fileName,
                            description : theProductFile[i].description,
                            price : theProductFile[i].price,
                            quantity: 1
                        }
                
                        theCartFile.push(cartItemObj);
                        fs.writeFile(__dir+"/cart.json",JSON.stringify(theCartFile),(err)=>{
                            if(err) res.send("error in writing cart.json")
                            else res.json({msg:"Item added in cart!"});
                            return;
                        })
                    }
                }
            }
        })        
    })
})

router.put('/',(req,res)=>{
    // console.log(req.body)
    let quantity;
    fs.readFile(__dir +'/cart.json','utf-8',(err,data)=>{
        if(data.length == 0) theCartFile =[]
        else theCartFile = JSON.parse(data);

        for(let i=0; i < theCartFile.length;i++){
            if(theCartFile[i].id == req.body.productId){
                if(req.body.isPlus) theCartFile[i].quantity++;
                else theCartFile[i].quantity--;
                quantity = theCartFile[i].quantity;
                break;
            }
        }

        fs.writeFile(__dir+"/cart.json",JSON.stringify(theCartFile),(err)=>{
            // if(quantity == 0) { 
            //     res.render('cartPage',{username : req.session.username, loggedIn: req.session.is_logged_in, products: products}); 
            //     return;
            // }
            if(err) res.send("error in writing cart.json")
            else res.json({msg:'cart put req', quantity:quantity})
            return;
        })
    })
})

router.delete('/',(req,res)=>{
    console.log(req.body)

    fs.readFile(__dir +'/cart.json','utf-8',(err,data)=>{
        if(data.length == 0) theCartFile =[]
        else theCartFile = JSON.parse(data);

        for(let i=0; i < theCartFile.length;i++){
            if(theCartFile[i].id == req.body.productId){
                theCartFile.splice(i,1);
                break;
            }
        }

        fs.writeFile(__dir+"/cart.json",JSON.stringify(theCartFile),(err)=>{
            if(err) res.send("error in writing cart.json")
            else res.json({msg:'cart delete req'})
            return;
        })
    })

    res.send('cart delete req')
})

module.exports = router;