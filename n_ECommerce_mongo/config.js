const mongoose = require('mongoose');

// this is localhost mongo db
mongoose.connect("mongodb://127.0.0.1:27017/ECommerceMongoDB")
.then( ()=> {
    console.log("mongo connected");
})
.catch( (err)=> {
    console.log(err);
})

// this part is working, cloud db
// let DB = require('./methods/utils);
// mongoose.connect(DB)
// .then( ()=>{
//     console.log("connection done")

// }).catch((err) => console.log("!connection",err))

module.exports = mongoose;