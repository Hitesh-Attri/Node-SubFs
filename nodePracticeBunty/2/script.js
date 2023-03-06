let inputBox = document.getElementById('inputBox');
let btn = document.getElementById('btn');
let btn2 = document.getElementById('btn2');

btn.addEventListener('click',()=>{
    let data = inputBox.value;
    
    // let obj = JSON.stringify({
    //     str : data
    // });
    let obj = {
        str : data
    }

    let gRq = new XMLHttpRequest();
    gRq.open("GET", '/getData');
    gRq.send();
    gRq.addEventListener('load',(req,res)=>{
        console.log(gRq.responseText, typeof gRq.responseText, " < 11");
        let retrivedData = JSON.parse(gRq.responseText); // ye array hai idhr
        retrivedData.push(obj);

        let rqst = new XMLHttpRequest();
        rqst.open('POST',"/addData");
        rqst.setRequestHeader("Content-Type", "application/json");
        rqst.send(JSON.stringify(retrivedData));
        rqst.addEventListener('load',()=>{
            // console.log(typeof rqst.responseText, rqst.responseText, "brwsr console rspnse");
            console.log("brwsr console rspnse");
        });

    });
});

btn2.addEventListener('click',()=>{
    let rqst = new XMLHttpRequest();
    rqst.open('GET',"/getData");
    rqst.send();

    rqst.addEventListener('load',()=>{
        console.log(typeof rqst.responseText, rqst.responseText, "brwsr console rspnse");
        let dataRetrieved = JSON.parse(rqst.responseText);
        // console.log(dataRetrieved, typeof dataRetrieved,dataRetrieved.length);
        console.log(dataRetrieved, typeof dataRetrieved);
    });
});