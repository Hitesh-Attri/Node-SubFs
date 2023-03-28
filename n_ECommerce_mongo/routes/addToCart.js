const express = require('express');
const router = express.Router();
const fs = require('fs');
const DbSchema = require('../DbSchema');
const productSchema = require('../productSchema');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2";

// router.use(express.json());

router.get('/', async (req,res)=>{
    console.log(req.body,"< in get");
    let user = await DbSchema.findOne({email: req.session.email});
    let userCart = user.cart;

    res.render('cartPage', {username : req.session.username, loggedIn: req.session.is_logged_in, products: userCart}) 
})

router.post('/', async (req,res)=>{
    console.log("imsA >",req.body)
    // add to cart here

    let user = await DbSchema.findOne({email: req.session.email});
    let userCart = user.cart;

    let result = await userCart.find(item => item.id == req.body.productId)
    if(result){
        res.json({msg:"Item already in cart!"});
        return;
    }else{
        let theProduct = await productSchema.findOne({id:req.body.productId});
        console.log(theProduct,"< theProduct findeone");
        let cartItemObj = {
            id: theProduct.id,
            productName : theProduct.productName,
            fileName : theProduct.fileName,
            description : theProduct.description,
            price : theProduct.price,
            quantity: 1
        }
        user.cart.push(cartItemObj);
        user.save();
        res.json({msg:"Item added in cart!"});        
    }
})

router.put('/', async (req,res)=>{
    // console.log(req.body)
    let quantity;
    let user = await DbSchema.findOne({email: req.session.email});
    let userCart = user.cart;
    let result = await userCart.find(item => item.id == req.body.productId)

    // console.log(result, " < put reqst")

    if(req.body.isPlus) result.quantity++;
    else {
        if(result.quantity>1) result.quantity--;
    }
    quantity = result.quantity;

    await user.save();

    res.json({msg:'cart put req', quantity:quantity})
})

router.delete('/',(req,res)=>{
    console.log(req.body)
    // req.body.productId  

    fs.readFile(__dir +'/cart.json','utf-8',(err,data)=>{
        if(data.length == 0) theCartFile =[]
        else theCartFile = JSON.parse(data);

        for(let i=0; i < theCartFile.length;i++){
            if(theCartFile[i].id == req.body.productId){
                theCartFile.splice(i,1);
                console.log("splice")
                break;
            }
        }

        fs.writeFile(__dir+"/cart.json",JSON.stringify(theCartFile),(err)=>{
            if(err) res.json({msg:"error in writing cart.json",success:false})
            else res.json({msg:'cart delete req',success:true})
            // res.redirect('/cart')
            return;
        })
    })
    // res.send('cart delete req')
})

module.exports = router;