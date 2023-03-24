const express = require('express');
const router = express.Router();
const fs = require('fs');
const sendEmail = require('../methods/sendEmail');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"

router.get('/',(req,res)=>{
    if(req.session.is_logged_in){
        res.redirect('/home');
    }else{
        res.render('signup',{error:false, msg:""});
    }
})

router.post('/',(req,res)=>{
    let flag = false;
    let currUser = req.body;
    fs.readFile(__dir+"/data.json",'utf-8',(error,data)=>{
        let theFile;
        if(data.length === 0){
            theFile =[];
        }else{
            theFile = JSON.parse(data);
        }
        for(let i = 0 ; i < theFile.length;i++){
            // |
            if(theFile[i].username === currUser.username && theFile[i].email === currUser.email){
                flag = true;
                console.log("user already exists");

                res.render('signup', {error:true, msg:"User already exists!"})
                return;
            }
        }
        if(!flag){
            let obj = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                isVerified: false,
                mailToken: Date.now()
            } 
            if(obj.username == "" || obj.email== "" || obj.password == ""){
                res.render('signup',{error:true, msg:"All field required! nJs"});
                return;
            }
            sendEmail(req, obj.mailToken, (info)=>{
                console.log("this is sendEmail callback")
                // console.log(info)

                fs.readFile(__dir+'/data.json','utf-8',(err,data)=>{
                    if(data.length === 0) theFile = [];
                    else theFile = JSON.parse(data);
                    
                    theFile.push(obj);
                    fs.writeFile(__dir + "/data.json",JSON.stringify(theFile),(err)=>{
                        console.log("written successfully");
                        req.session.is_logged_in = true;
                        req.session.email = obj.email;
                        req.session.username = obj.username;
                        res.redirect('/home');
                    })
                });
            });
        }
    })
})

module.exports = router;