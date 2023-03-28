const express = require('express');
const router = express.Router();
const sendEmail = require('../methods/sendEmail');
const DbSchema = require('../DbSchema');

router.get('/',(req,res)=>{
    if(req.session.is_lged_in) s.redirect('/home');
    else res.render('signup',{error:false, msg:""});
})

router.post('/', async (req,res)=>{
    let flag = false;
    let currUser = req.body;
    // let user=req.query.username;
    // console.log(currUser,"<<<<<")

    let theObj = await DbSchema.findOne({ username:currUser.username});
    // console.log(theObj,"<< the obj");

    if(theObj){
        console.log("user already exists");
        // console.log("signupjs if")
        res.render('signup',{error:true, msg:"User already exists"});
        return;
    }
   
    let obj = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isVerified: false,
        mailToken: Date.now(),
        cart: []
    }
    if(obj.username == "" || obj.email== "" || obj.password == ""){
        res.render('signup',{error:true, msg:"All field required! nJs"});
        return;
    }

    obj = new DbSchema(obj);

    sendEmail(req, obj.mailToken, (info)=>{
        console.log("this is sendEmail callback")
        // console.log(info)

        obj.save();

        console.log("obj saved successfully");
        req.session.is_logged_in = true;
        req.session.email = obj.email;
        req.session.username = obj.username;
        res.redirect('/home');
    })
})

module.exports = router;

