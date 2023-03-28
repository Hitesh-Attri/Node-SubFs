const express = require('express');
const router = express.Router();
const fs = require('fs');
const session = require('express-session');
const DbSchema = require('../DbSchema');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"

router.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

router.get('/',(req,res)=>{
    if(req.session.is_logged_in) res.redirect('/home');
    else res.render('forgetPass');
})

router.post('/', async (req,res)=>{
    let flag = false;
    let currUser = req.body;
    // console.log(currUser);
    let user = await DbSchema.findOne({email : currUser.email})
    if(user){
        if(user.isVerified){
            flag = true;
            user.password = currUser.password;
            
            user.save();
            
            console.log('f-p -> updated');
            res.render('root', { loggedOut:-1, msg:"Login with your new password"});
            return;
        }
        else{
            res.render('root', { loggedOut:-1, msg:"Please verify your email!"});
            return;
        }  
    }

    if(!flag) res.render('root', { loggedOut:-1, msg:"Invalid email id!"});
})

module.exports = router;