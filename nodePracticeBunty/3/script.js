let inputBox = document.getElementById('inputBox');
let btn = document.getElementById('btn');
let btn2 = document.getElementById('btn2');

btn.addEventListener('click',()=>{
    let data = inputBox.value;
        if(data!=""){
        
        // let obj = JSON.stringify({
        //     str : data
        // });
        let obj = {
            str : data
        };

        let rqst = new XMLHttpRequest();
        rqst.open('POST',"/addData");
        rqst.setRequestHeader("Content-Type", "application/json");
        rqst.send(JSON.stringify(obj));
        rqst.addEventListener('load',()=>{
            console.log(typeof rqst.responseText, rqst.responseText, "brwsr console rspnse");
        });
    }
});

btn2.addEventListener('click',()=>{
    let rqst = new XMLHttpRequest();
    rqst.open('GET',"/getData");
    rqst.send();

    rqst.addEventListener('load',()=>{
        // console.log(typeof rqst.responseText, rqst.responseText, "brwsr console rspnse");
        let dataRetrieved = JSON.parse(rqst.responseText);
        console.log(dataRetrieved, typeof dataRetrieved,dataRetrieved.length);
    });
});