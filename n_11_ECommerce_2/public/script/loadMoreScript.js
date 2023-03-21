let loadMoreBtn = document.getElementById('loadMoreBtn');
// let ulList = document.getElementById('ulList');

console.log("sheeeeeeeeeeeeeeeeeeeesh");

var curr = 5;
let num = 5;
let flag = true;
let limit = 10;

loadMoreBtn.addEventListener('click', () => {

    let reqst = new XMLHttpRequest();
    reqst.open("POST", '/getProducts');
    reqst.setRequestHeader('Content-Type', 'application/json');
    console.log(curr,"just before the rqst ")
    reqst.send(JSON.stringify({curr: curr}));
    reqst.addEventListener('load', () => {
        // console.log(reqst.responseText, typeof reqst.responseText);
        let obj = JSON.parse(reqst.responseText);
        // console.log(obj, typeof obj, " the obj");
        // console.log(obj.theFile2, typeof obj.theFile2, "the products");
        
        if (obj.isEmpty) {
            flag = false;
            alert("no more products");
        }
        else {
            console.log('loop');
            let products = obj.theFile2;
            // console.log(products, "else case");

            for (let i = 0; i < products.length; i++) {
                // console.log(i);
/*
                let li = document.createElement('li');
                let div = document.createElement('div');
                let img = document.createElement('img');

                img.setAttribute('src', products[i].fileName);

                // for pruduct name
                let p = document.createElement('p');
                p.innerText = products[i].productName;

                let VDbtn = document.createElement('button');
                VDbtn.id = `viewDetailBtn-${num}`;
                VDbtn.addEventListener('click', () => {
                    // let btnID = this.id;
                    // console.log(btnID, typeof btnID);
                    // btnID = btnID.replace("viewDetailBtn-","");
                    // console.log(btnID, typeof btnID);
                    
                    togglePopup(this.id);
                })
                VDbtn.innerText = "View details";

                div.appendChild(img);
                div.appendChild(p)
                div.appendChild(VDbtn);

                let popupID = `popup-${num}`;
                let popup = `
                <div class="popup" id= "${popupID}">
                <div class="overlay"></div>
                <div class="content">
                    <div id= "close-btn${popupID}" class="close-btn" onclick="togglePopup(this.id)">&times;</div>
                        <h1>Details =></h1>    
                        <p> Product Details here!!! </p>
                        <p> Description: ${products[i].description} </p>
                        <p> Price: ${products[i].price} </p>
                    </div>
                </div> `

                li.innerHTML = popup;
                li.appendChild(div);
                ulList.appendChild(li);
                let br = document.createElement('br');
                ulList.appendChild(br);
                */

                
                let t = `
                <div class="product">
                  <div class="text-center">
                    <img src="${products[i].fileName}" class="img-fluid" />
                  </div>
                  <h6>${products[i].productName}</h6>
                  <button id="viewDetailBtn-i" onclick="togglePopup(this.id)"> View details </button>
                  <button id="addToCartBtn-i" onclick="addToCart(this.id)" > Add to Cart </button>
                </div>
                <br/> `

              let div1 = document.createElement('div');
              div1.className = "col-md-3"
              div1.innerHTML= t;
              document.getElementById('parDiv').appendChild(div1);
                
                num++;
                if (i == products.length - 1) noMorePrdct = true;
            }
            // curr = limit;
            limit += 5;
            if (limit > products.length) {
                console.log("here");
                limit = products.length;
            }
        }
    })
    if(flag) curr = curr + 5;
})

let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (document.getElementById('productImg').value == "") {
        alert("Please select an image!");
    }
    else {
        const data = new FormData(event.target);
        const reqst = new XMLHttpRequest();
        reqst.open('POST', '/uploadProduct');
        reqst.send(data);
        reqst.addEventListener('load', () => {
            // data contains the img filename
            const data = JSON.parse(reqst.responseText);
            // obj.file = data.filename;
            console.log(data);
            // console.log(data.filename);
            form.reset();
        });
    }
})

function togglePopup(ID) {
    
    // console.log(ID,typeof ID);
    // if(ID == "div-4"){
    //     ID = ID.replace("div-","");
    //     ID= "popup"+ID;
    // }
    // else if(ID == "viewDetailBtn-0"){
    //     ID = ID.replace("viewDetailBtn-","");
    //     ID= "popup-"+ID;
    // }
    console.log(ID,'here');
    document.getElementById('popup1').classList.toggle("active");
}


function addToCart(){
    
}






/*
let rqst = new XMLHttpRequest();
rqst.open('GET', '/getProducts');
rqst.send();
rqst.addEventListener('load',()=>{
    let products = JSON.parse(rqst.responseText);
    let noMorePrdct = false;
    if(products.length < 5) noMorePrdct=true;

    loadMoreBtn.addEventListener('click',()=>{
        if(noMorePrdct ){
            alert("no more products")
        }
        // if(limit <= products.length){
        else{
            console.log('loop');
            for(let i = curr; i < limit; i++){
                console.log(i);

                let li = document.createElement('li');
                let div = document.createElement('div');
                let img = document.createElement('img');

                img.setAttribute('src', products[i].fileName );

                // for pruduct name
                let p = document.createElement('p');
                p.innerText = products[i].productName;
                
                let VDbtn = document.createElement('button');
                VDbtn.addEventListener('click',()=>{
                    togglePopup();
                })
                VDbtn.innerText = "View details";

                div.appendChild(img);
                div.appendChild(p)
                div.appendChild(VDbtn);

                let popup = `
                    <div class="popup" id="popup-1">
                    <div class="overlay"></div>
                    <div class="content">
                        <div class="close-btn" onclick="togglePopup()">&times;</div>
                            <h1>Details =></h1>    
                            <p> Product Details here!!! </p>
                            <p> Description: ${products[i].description} </p>
                            <p> Price: ${products[i].price} </p>
                        </div>
                    </div>
                `

                li.innerHTML = popup;
                li.appendChild(div);
                ulList.appendChild(li);
                let br = document.createElement('br');
                ulList.appendChild(br);

                if(i == products.length-1) noMorePrdct = true;
            }
            curr = limit;
            limit += 5;
            if(limit > products.length) {
                console.log("here");
                limit = products.length;
            }
        }
        // else{
        //     alert("no more products")
        // }
        
    })
})
*/