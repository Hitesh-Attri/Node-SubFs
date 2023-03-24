const express = require('express');
const router = express.Router();
const fs = require('fs');
const session = require('express-session');
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

router.post('/',(req,res)=>{
    let flag = false;
    let currUser = req.body;
    // console.log(currUser);
    fs.readFile(__dir+"/data.json",'utf-8',(error,data)=>{
        let theFile;
        if(data.length === 0) theFile =[];
        else theFile = JSON.parse(data);

        for(let i = 0 ; i < theFile.length;i++){
            if(theFile[i].email === currUser.email){
                if(theFile[i].isVerified){
                    flag = true;
                    theFile[i].password = currUser.password;

                    fs.writeFile(__dir +"/data.json",JSON.stringify(theFile),(err)=>{
                        console.log('f-p -> updated');
                        res.render('root', { loggedOut:-1, msg:"Login with your new password"});
                        return;
                    })
                }
                else{
                    res.render('root', { loggedOut:-1, msg:"Please verify your email!"});
                    return;
                }   
            }
        }
        if(!flag) res.render('root', { loggedOut:-1, msg:"Invalid email id!"});
    })
})

module.exports = router;