// imports
const express = require('express')
const fs = require('fs')
const session = require('express-session');
// for checking the auth.. if logged in
const checkAuth = require('./middlewares/checkAuth');
const sendEmail = require('./methods/sendEmail');
const getProductDetails = require('./methods/getProductDetails');
const verifyMail = require('./methods/verifyMail');

const app = express();
const port = 5000;

//routes
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const getProductsRoute = require('./routes/getProducts');
const changePassRoute = require('./routes/changePass');
const uploadProductRoute = require('./routes/uploadProduct');
const forgetPassRoute = require('./routes/forgetPass');
const addToCartRoute = require('./routes/addToCart');

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
    if(!req.session.is_logged_in) res.render('root', {loggedOut: 0, msg:""});
    else res.sendFile(__dirname+'/public/index.html')
})

app.route('/home').get( checkAuth, (req,res)=>{
    // read product json and send to home.ejs
    let products;
    fs.readFile(__dirname+"/products.json",'utf-8', (err,data)=>{
        if(data.length === 0) products = [];
        else products = JSON.parse(data);
        // console.log(products, typeof products);
        res.render('home', {username : req.session.username, loggedIn: req.session.is_logged_in, products: products}) 
    })
})

// routing
app.use('/login',loginRoute);
app.use('/signup',signupRoute);
app.use('/getProducts', getProductsRoute);
app.use('/changePass',changePassRoute);
app.use('/uploadProduct',uploadProductRoute);
app.use('/forgetPass',forgetPassRoute);
app.use('/cart',checkAuth,addToCartRoute);

// in "verifyMailRoute", to acces "token"-> use -> req.params.token;
app.get('/verifyMail/:token',verifyMail);

// app.route('/products/details/:itemId').get(getProductDetail,(req,res)=>{
//     console.log("249")
// });


app.get('/product/details/:itemId',checkAuth,getProductDetails);

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