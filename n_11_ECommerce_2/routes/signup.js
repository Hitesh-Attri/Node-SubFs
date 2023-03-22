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
            fs.readFile(__dir+'/data.json','utf-8',(err,data)=>{
                if(data.length === 0) theFile = [];
                else{
                    theFile = JSON.parse(data);
                }

                let obj = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    isVarified: false,
                    mailToken: Date.now()
                }

                theFile.push(obj);
                fs.writeFile(__dir + "/data.json",JSON.stringify(theFile),(err)=>{
                    console.log("written successfully");
                    // res.render('root', { loggedOut:2, msg:"You can login now!"});
                    // return;
                    // sendEmailsMailJet(obj.email,(err,data)=>{
                    //     if(!err)
                    //         res.render('root', { loggedOut:2, msg:"You can login now!"});
                    //     else
                    //         res.render('404');
                    // })
                    sendEmail(req,(info)=>{
                        // req.session.is_logged_in = true;
                        console.log("this is callback")
                        console.log(info)
                        res.send(`sending mail testing, ${req.body.email}`)
                        // res.render('root', { loggedOut:2, msg:"You can login now!"});
                    })
                    
                });
            });
        }
    })
})


module.exports = router;