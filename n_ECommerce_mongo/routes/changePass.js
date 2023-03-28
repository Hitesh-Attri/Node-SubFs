const express = require('express');
const router = express.Router();
const fs = require('fs');
const DbSchema = require('../DbSchema');
const checkAuth = require('../middlewares/checkAuth');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"


router.get('/',checkAuth,(req,res)=>{
    res.render('changePass', {error:false, msg: "from get"});
})

router.post('/',checkAuth,async (req,res)=>{
    // console.log(req.body , typeof req.body);
    let currData = req.body;
    currData.userEmail = currData.userEmail.trim();
    // currData.newPass = currData.newPass.trim();
    currData.confirmPass = currData.confirmPass.trim();

    // if(currData.newPass == "" || currData.confirmPass == "" || currData.userEmail==""){
    if(currData.newPass == "" || currData.confirmPass == "" ){
        res.render("changePass", { error: false, msg:"field cant be empty!"});
        return;
    }
    // else if(currData.email != req.session.email){
    //     res.render("changePass", { error: false, msg:"mmmmm chalaakii!. enter your own email,user!"});
    // }
    else if(currData.newPass != currData.confirmPass){
        res.render("changePass", { error: false, msg:"Password doesn't match!"});
        return;
    }
    else{

        let theUser = await DbSchema.findOne(req.session.email);
        console.log(currData.newPass,"<<");

        theUser.password = currData.newPass;

        theUser.save();
        
        res.render("changePass", { error: false, msg:"Password Changed Successfully!"});
    }
})

module.exports = router;