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
    if(req.session.is_logged_in){
        res.redirect('/home');
    }else{
        res.render('root',{loggedOut: 0, msg:""});
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
            if(theFile[i].username === currUser.username && theFile[i].password === currUser.password){
                flag = true;
                req.session.is_logged_in = true;
                req.session.email = theFile[i].email;
                req.session.username = currUser.username;
                res.redirect("/home");
            }
        }
        if(!flag){
            res.render('root', { loggedOut:-1, msg:"Invalid Credentials!"});
        }
    })
})

module.exports = router;