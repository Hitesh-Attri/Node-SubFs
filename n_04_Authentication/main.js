let express = require('express');
const session = require('express-session');
let app = express();
let port = 4000;

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

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

    req.session.is_logged_in = true;
    res.redirect("/");

    // res.sendFile(__dirname + "/public/home/index.html");
})

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname + '/public/signup/index.html');
})

// app.get('*',(req,res)=>{
//     // console.log("this");
//     console.log(req.session);
//     res.send('ha');
// })

app.listen(port,(err)=>{
    if(!err) console.log(`server running at port ${port}`);
});
