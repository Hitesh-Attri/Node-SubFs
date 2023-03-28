// const express = require('express');
// const router = express.Router();
const verificaltionConfirmationEmail = require('./verificationConfirmationMail');

const DbSchema = require('../DbSchema');

const verifyMail = async (req,res)=>{
    const token = req.params.token;
    console.log(token," < verify email js method")

    let theObj = await DbSchema.findOne({mailToken:token});
    console.log(theObj,"verify email theObj print")

    if(theObj){
        // is this block. mail token exists for theObj. update the mail token to verified:true
        theObj.isVerified = true;
        // req.session.is_logged_in = true;
        // req.session.email = theObj.email;
        // req.session.username = theObj.username;

        // console.log(theObj.email,"<-", typeof theObj.email)
        verificaltionConfirmationEmail(theObj.email); // verification confirmation mail is not launching
        // console.log(theObj.email,"<<-")

        theObj.save();
        console.log('mongodb updated, verifyMail.js')
        res.send("Email verified, you can login now");
    }
    else{
        res.render('root', { loggedOut:-1, msg:"invalid email, verification failed"});
    }
}

module.exports = verifyMail;