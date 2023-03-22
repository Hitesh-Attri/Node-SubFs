const express = require('express');
const router = express.Router();
const fs = require('fs');
const checkAuth = require('../middlewares/checkAuth');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"


router.get('/',checkAuth,(req,res)=>{
    res.render('changePass', {error:false, msg: "from get"});
})

router.post('/',checkAuth,(req,res)=>{
    // console.log(req.body , typeof req.body);
    let currData = req.body;
    // currData.userEmail = currData.userEmail.trim();
    currData.newPass = currData.newPass.trim();
    currData.confirmPass = currData.confirmPass.trim();

    // if(currData.newPass == "" || currData.confirmPass == "" || currData.userEmail==""){
    if(currData.newPass == "" || currData.confirmPass == "" ){
        res.render("changePass", { error: false, msg:"field cant be empty!"});
        return;
    }
    // else if(currData.email != req.session.email){
    //     res.render("changePass", { error: false, msg:"mmmmm chalaakii!. enter your own email user!"});
    // }
    else if(currData.newPass != currData.confirmPass){
        res.render("changePass", { error: false, msg:"Password doesn't match!"});
        return;
    }
    else{
        let theFile;

        fs.readFile(__dir +"/data.json",'utf-8',(err,data)=>{
            if(data.length === 0) theFile = [];
            else{
                theFile = JSON.parse(data);
            }
            let passChngeFlag = false;
            console.log(currData.newPass,"<<");
            for(let i = 0 ; i < theFile.length;i++){
                // find the user whose pass is to be changed
                if(theFile[i].email == req.session.email){
                    theFile[i].password = currData.newPass;
                    passChngeFlag = true;

                    fs.writeFile(__dir+'/data.json',JSON.stringify(theFile),()=>{
                        console.log('pass updated')
                    })
                    break;
                }
            }
            if(passChngeFlag) res.render("changePass", { error: false, msg:"Password Changed Successfully!"});
            else res.render("changePass", { error: false, msg:"some mgs"});
        })
    }
})

module.exports = router;