const express = require('express')
const app = express();
const fs = require('fs')
const session = require('express-session');
const multer = require('multer');
const port = 5000;

// for checking the auth.. if logged in
const checkAuth = require('./middlewares/checkAuth');
const sendEmail = require('./methods/sendEmails');

const upload = multer ( { 
    dest:'uploads'
})

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine','ejs');
app.use(express.json()); 
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'))

app.route('/').get((req,res)=>{
    if(!req.session.is_logged_in){
        res.render('root', {loggedOut: 0, msg:""});
    }else{
        // res.redirect('/home');
        res.sendFile(__dirname+'/public/index.html')
    }
})

app.route('/home').get( checkAuth, (req,res)=>{
    // read product json and send to home.ejs
    let products;
    fs.readFile(__dirname+"/products.json",'utf-8', (err,data)=>{
        if(data.length === 0) products = [];
        else{
            products = JSON.parse(data);
        }
        // console.log(products, typeof products);
        res.render('home', {username : req.session.username, loggedIn: req.session.is_logged_in, products: products}) 
    })
})

app.route('/login').get((req,res)=>{
    if(req.session.is_logged_in){
        res.redirect('/home');
    }else{
        res.render('root',{loggedOut: 0, msg:""});
    }
})
.post((req,res)=>{
    let flag = false;
    let currUser = req.body;
    fs.readFile(__dirname+"/data.json",'utf-8',(error,data)=>{
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

app.route('/signup').get((req,res)=>{
    if(req.session.is_logged_in){
        res.redirect('/home');
    }else{
        res.render('signup',{error:false, msg:""});
    }
})
.post((req,res)=>{
    let flag = false;
    let currUser = req.body;
    fs.readFile(__dirname+"/data.json",'utf-8',(error,data)=>{
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
            fs.readFile(__dirname+'/data.json','utf-8',(err,data)=>{
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
                fs.writeFile(__dirname + "/data.json",JSON.stringify(theFile),(err)=>{
                    console.log("written successfully");
                    res.render('root', { loggedOut:2, msg:"You can login now!"});
                    return;
                    sendEmail(obj.email,(err,data)=>{
                        if(!err)
                            res.render('root', { loggedOut:2, msg:"You can login now!"});
                        else
                            res.render('404');
                    })
                });
            });
        }
    })
})

app.post('/getProducts',(req,res)=>{
    // console.log(req.body, typeof req.body);
    let i = req.body.curr;
    console.log(i);
    let theFile;
    let theFile2;
    let isEmpty;
    fs.readFile(__dirname + '/products.json','utf-8',(err,data)=>{

        if(data.length === 0) {
            res.json({isEmpty:true, theFile2:[]});
            theFile = [];
        }
        else{
            theFile = JSON.parse(data);
            if( i < theFile.length ){
                theFile2 = theFile.slice(i,i+5);
                // isEmpty = false;
                res.json({isEmpty:false, theFile2:theFile2});
            }
            else{
                // isEmpty=true;
                res.json({isEmpty:true, theFile2:[]});
            }
        }
        // res.json({isEmpty:isEmpty,theFile2:theFile2});
    });
})

app.post('/uploadProduct',upload.single('productImage'), (req,res)=>{
    console.log("product img here");
    // console.log(req.file);
    // console.log(req.body,typeof req.body);
    let obj = {
        productName:req.body.productName,
        fileName : req.file.filename,
        description : req.body.productDesc,
        price : req.body.productPrice
    }
    let theProducts;
    fs.readFile(__dirname +"/products.json",'utf-8',(err,data)=>{
        if(data.length === 0) theProducts = [];
        else{
            theProducts = JSON.parse(data);
        }
        theProducts.push(obj);
        fs.writeFile(__dirname+'/products.json', JSON.stringify(theProducts),(err)=>{
            console.log("products.json updated")
        })
    })
    res.send(req.file);
})

app.route('/changePass').get(checkAuth,(req,res)=>{
    res.render('changePass', {error:false, msg: "from get"});
})
.post(checkAuth,(req,res)=>{
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

        fs.readFile(__dirname +"/data.json",'utf-8',(err,data)=>{
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

                    fs.writeFile(__dirname+'/data.json',JSON.stringify(theFile),()=>{
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

app.get('/logout',(req,res)=>{
    if(req.session.is_logged_in){
        console.log("/logout")
        req.session.destroy();
        res.render('root',{loggedOut: 1, msg:"Logged out!"})
    }
    else{
        res.render('root',{loggedOut: false, msg:"Login to krlo phle :)"})
    }
})

app.get('*',(req,res)=>{
    res.render('404');
});

app.listen(port,(error)=>{
    // if(!error) console.log("main--> Server running at port,", port);
    if(!error) console.log(`App listening at http://localhost:${port}`)
    else console.log("Error! ", error);
})