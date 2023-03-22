const express = require('express');
const router = express.Router();
const fs = require('fs');
const __dir = "E:\\study\\A1\\A2\\CQ\\node\\CQnodeAssignments\\n_11_ECommerce_2"


router.post('/',(req,res)=>{
    // console.log(req.body, typeof req.body);
    let i = req.body.curr;
    console.log(i);
    let theFile;
    let theFile2;
    let isEmpty;
    fs.readFile(__dir + '/products.json','utf-8',(err,data)=>{

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


module.exports = router;