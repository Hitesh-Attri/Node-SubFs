const express = require('express');
const router = express.Router();
const session = require('express-session');
const DbSchema = require('../DbSchema');

router.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

router.get('/',(req,res)=>{
    if(req.session.is_logged_in) res.redirect('/home');
    else res.render('root',{loggedOut: 0, msg:""});
})

router.post('/', async (req,res)=>{
    let currUser = req.body;

    let theObj = await DbSchema.findOne({username:currUser.username});
    console.log(theObj,"<< login route js");

    if(theObj){
        // in this block, => username exists, now check if the password is correct or not
        if(currUser.password == theObj.password){
            // here password is correct , => now check if the user's email is verified or not
            if(theObj.isVerified){
                req.session.is_logged_in = true;
                req.session.email = theObj.email;
                req.session.username = currUser.username;
                res.redirect("/home");
            }
            else{
                // in this block, => user's email is not verified
                res.render('root', { loggedOut:-1, msg:"Please verify your email!"});
                return;
            }   
        }else{
            // password is wrong
            res.render('root', { loggedOut:-1, msg:"Invalid Credentials!"});
        }
    }
    else{
        // is this block, username doesn't exists
        res.render('root', { loggedOut:-1, msg:"Invalid Credentials!"});
    }
})

module.exports = router;