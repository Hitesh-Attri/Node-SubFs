// const { json } = require('express');
let express = require('express');
const session = require('express-session');
let fs = require('fs');
let app = express();
let port = 4000;

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine','ejs');
app.use(express.urlencoded({ extended:true }));
app.use(express.json()); 
// app.use(express.static('public'));

app.get('/',(req,res)=>{
    // console.log("this");
    if(req.session.is_logged_in){
        res.sendFile(__dirname + '/public/home/index.html');
    }else{
        res.redirect('/login');
    }
})

app.get('/home',(req,res)=>{
    res.sendFile(__dirname + '/public/home/index.html');
})

app.get('/myAcc',(req,res)=>{
    if(req.session.is_logged_in){
        // res.sendFile(__dirname + '/public/myAcc/index.html');
        let theFile;
        fs.readFile(__dirname+'/data.json','utf-8',(err,data)=>{
            if(data.length === 0) theFile =[]
            else theFile = JSON.parse(data);
            res.render('myAcc/index',{ username: req.session.username, email:req.session.email, theFile:theFile} );
        });
        // res.render('index');
    }else{
        res.redirect('/login');
    }
})

// app.get('/login',(req,res)=>{
//     res.sendFile(__dirname + '/public/login/index.html');
// })

app.route('/login').get((req,res)=>{
    if(!req.session.is_logged_in){
        res.sendFile(__dirname + '/public/login/index.html');
    }else{
        res.redirect('/');
    }
})
.post((req,res)=>{
    console.log(req.body);

    // match username from the db or here fromt the file
    let currUser = req.body;
    
    fs.readFile(__dirname +'/data.json','utf-8',(err,data)=>{
        let theFile;
        let flag = false;
        if(data.length === 0){
            theFile = [];
        }
        else{
            // console.log(data,typeof data);
            theFile = JSON.parse(data);
            // console.log(theFile,typeof theFile);
        }
        for(let i = 0; i < theFile.length; i++){
            if(theFile[i].username === currUser.username && theFile[i].password === currUser.password){
                flag = true;
                req.session.is_logged_in = true;
                req.session.username = theFile[i].username;
                req.session.email = theFile[i].email;
                res.redirect("/");
            }
        }
        if(!flag){
            console.log("user doesnt exit");
            res.redirect('/createAcc');
        }
    });
});

app.route('/signup').get((req,res)=>{
    res.sendFile(__dirname + '/public/signup/index.html');
}) // what if user already exists
.post((req,res)=>{
    console.log(req.body, typeof req.body,"95");
    let flag2 = false;
    // let theFile;
    let currUser = req.body;
    fs.readFile(__dirname +'/data.json','utf-8',(err,data)=>{
        let theFile;
        if(data.length === 0){
            theFile = [];
        }
        else{
            theFile = JSON.parse(data);
        }
        for(let i = 0; i < theFile.length;i++){
            if(theFile[i].username === currUser.username && theFile[i].email === currUser.email && theFile[i].password === currUser.password){
                flag2 = true;
                console.log("user already exists");
                res.redirect("/");
            }
        }
        if(!flag2){
            fs.readFile(__dirname+'/data.json','utf-8',(err,data)=>{
                if(data.length === 0) theFile = [];
                else{
                    theFile = JSON.parse(data);
                }
                theFile.push(req.body);
                fs.writeFile(__dirname + "/data.json",JSON.stringify(theFile),(err)=>{
                    console.log("written successfully");
                });
            });
            res.redirect('/');
            // res.redirect('/createAcc');
        }
    });
});

app.get('/createAcc',(req,res)=>{
    res.redirect('/signup');
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

// app.get('*',(req,res)=>{
//     // console.log("this");
//     console.log(req.session);
//     res.send('ha');
// })

app.listen(port,(err)=>{
    if(!err) console.log(`server running at port ${port}`);
});
