let listDiv = document.getElementById('list-here');
let area = document.getElementById("input-box");
let submiBtn = document.getElementById("taskSubmit");
let tasksRetrieved;

// temp line
let imgUrl = "https://media.gettyimages.com/id/83888573/photo/harry-reid-discusses-clean-energy-policies-and-ideas-at-googles-dc-office.jpg?s=1024x1024&w=gi&k=20&c=zmsm_RUHN_GRlbup9QupxG6dIHIxLXc9vSreedx1Xyc=";

let Ids = 0;

function eraseText() {
    if (area.value == "") {
        alert("Nothing to clear");
    }
    else {
        area.value = "";
    }
}

// make changes here such that addTask only pushes data to the server
function addTask() {
    // str contains the 'task' text from the text area
    let str = area.value;

    str = str.trim();
    str = removeExcessSpacesAndNewlines(str);

    if (str.length == 0) {
        alert("Task can't be empty!")
    } else {
        let rqst = new XMLHttpRequest();
        rqst.open('GET', "/getData");
        rqst.send();
        rqst.addEventListener('load', () => {
            let obj = {
                T: str,
                isCheck: 0,
                id: `${Date.now()}`
            }
            // POST rqst
            let rqst2 = new XMLHttpRequest();
            rqst2.open("POST", "/pushObj");
            rqst2.setRequestHeader("Content-Type", "application/json");
            rqst2.send(JSON.stringify(obj));
            // console.log(typeof tasksRetrieved, tasksRetrieved);
            rqst2.addEventListener('load', () => {

                listDiv.innerHTML = "";
                loadData();
                eraseText();
            });
        });
    }
}

submiBtn.addEventListener('click',(event)=>{
    let str = area.value;
    str = removeExcessSpacesAndNewlines(str);
    if (str.length == 0) {
        event.preventDefault();
        alert("Task can't be empty!");
    }
    else if (document.getElementById("file").value == "") {
        event.preventDefault();
        alert("Please select an image!");
    }
    else if(document.getElementById("file").value != "" && str.length != 0){
        addTask();
        // document.getElementById("file").value = null;
    }
    else{
        // document.getElementById("file").value = null;
        event.preventDefault();
        console.log("in else")
    }
    console.log("submit btn clicked");
});


area.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        // Call your function here
        // addTask();
    }
});

function removeExcessSpacesAndNewlines(str) {
    return str.replace(/[\s\n]+/g, ' ').trim();
}

function loadData() {
    let rqst = new XMLHttpRequest();
    rqst.open("GET", "/getData");
    rqst.send();
    rqst.addEventListener('load', () => {
        let tasksRetrieved = JSON.parse(rqst.responseText);
        // console.log(typeof tasksRetrieved, tasksRetrieved, "onload first");
        if (tasksRetrieved.length != 0) {

            for (let i = 0; i < tasksRetrieved.length; i++) {
                var div2 = document.createElement('div');
                div2.className = "list-div";
                let listDivIdStr = `list-div${tasksRetrieved[i].id}`;
                div2.id = listDivIdStr;
                listDiv.appendChild(div2);

                var pTag = document.createElement("p");
                pTag.className = "tasks";
                let pTagIdStr = `tasks${tasksRetrieved[i].id}`;
                pTag.id = pTagIdStr;
                pTag.innerText = tasksRetrieved[i].T;
                if (tasksRetrieved[i].isCheck == 1) {
                    pTag.style.textDecoration = "line-through";
                }
                div2.appendChild(pTag);

                let imgTag = document.createElement("img");
                imgTag.setAttribute('src', imgUrl);
                imgTag.setAttribute('alt', 'task_img');
                // imgTag.setAttribute('height', '60px');
                // imgTag.setAttribute('width', '4.5rem');
                imgTag.className ="task-img";
                div2.appendChild(imgTag);

                var divBtns = document.createElement('div');
                divBtns.className = "div-btns";
                let divBtnsIdStr = `div-btns${tasksRetrieved[i].id}`;
                divBtns.id = divBtnsIdStr;
                div2.appendChild(divBtns);

                sendData(tasksRetrieved);

                var b1 = document.createElement('button');
                b1.className = "editBtn";
                b1.id = `editBtn${tasksRetrieved[i].id}`;
                b1.addEventListener('click', function () {
                    let editBtnIdStr = this.id;
                    let editBtnIdNum = editBtnIdStr.replace("editBtn", "");
                    editTask(editBtnIdNum);
                });

                var b2 = document.createElement('input');
                b2.setAttribute("type", "checkbox");
                b2.className = "checkBtn";
                b2.id = `checkBtn${tasksRetrieved[i].id}`;
                if (tasksRetrieved[i].isCheck == 1) {
                    b2.checked = true;
                }
                b2.addEventListener('change', function () {
                    let checkBtnIdStr = this.id;
                    let checkBtnIdNum = checkBtnIdStr.replace("checkBtn", "");
                    console.log(typeof checkBtnIdNum, checkBtnIdNum);

                    if (this.checked) {
                        // console.log("Checkbox is checked..");
                        lineThroughTrue(checkBtnIdNum);

                        let rqst4 = new XMLHttpRequest();
                        rqst4.open("GET", "/getData");
                        rqst4.send();
                        rqst4.addEventListener("load", () => {
                            tasksRetrieved = JSON.parse(rqst4.responseText);
                            let checkBtnIdOnListen = this.id;
                            checkBtnIdOnListen = checkBtnIdOnListen.replace("checkBtn", "");
                            tasksRetrieved[findIndex(checkBtnIdOnListen,tasksRetrieved)].isCheck = 1;

                            // console.log("inside b2 if listern", this.checked, tasksRetrieved[findIndex(checkBtnIdOnListen,tasksRetrieved)].isCheck);
                            
                            sendData(tasksRetrieved);
                        });
                    }
                    else {
                        // console.log("Checkbox is not checked..");
                        lineThroughFalse(checkBtnIdNum);
                        let rqst41 = new XMLHttpRequest();
                        rqst41.open("GET", "/getData");
                        rqst41.send();
                        rqst41.addEventListener("load", () => {
                            tasksRetrieved = JSON.parse(rqst41.responseText);
                            // console.log(tasksRetrieved, typeof tasksRetrieved,"324");
                            let checkBtnIdOnListen = this.id;
                            checkBtnIdOnListen = checkBtnIdStr.replace("checkBtn", "");
                            tasksRetrieved[findIndex(checkBtnIdOnListen,tasksRetrieved)].isCheck = 0;

                            // console.log(tasksRetrieved, typeof tasksRetrieved,"330");

                            // console.log("inside b2 if listern", this.checked, tasksRetrieved[findIndex(checkBtnIdOnListen,tasksRetrieved)].isCheck);

                            sendData(tasksRetrieved);
                        });
                    } 
                });

                var b3 = document.createElement('button');
                b3.className = "deleteBtn";
                let b3IdStr = `deleteBtn${tasksRetrieved[i].id}`;
                b3.id = b3IdStr;
                b3.addEventListener('click', function () {
                    let dltBtnIdStr = this.id;
                    // console.log("on load dlt btn. listner idstr>", dltBtnIdStr, " <---");
                    let dltBtnIdNum = dltBtnIdStr.replace("deleteBtn", "");
                    // console.log(dltBtnIdNum, typeof dltBtnIdNum,"170 <---");

                    let rqst5 = new XMLHttpRequest();
                    rqst5.open("GET", "/getData");
                    rqst5.send();
                    rqst5.addEventListener("load", () => {
                        tasksRetrieved = JSON.parse(rqst5.responseText);

                        tasksRetrieved.splice(findIndex(dltBtnIdNum, tasksRetrieved), 1);
                        // console.log(findIndex(pTagOther.innerText, tasksRetrieved, "< inside onload"));
                        // console.log(pTagOther.innerText, typeof tasksRetrieved);

                        let postRqst2 = new XMLHttpRequest();
                        postRqst2.open("POST", "/addData");
                        postRqst2.setRequestHeader("Content-Type", "application/json");
                        postRqst2.send(JSON.stringify(tasksRetrieved));
                        postRqst2.addEventListener('load', () => {
                            // console.log("res cam back, 399");
                            deleteTask(dltBtnIdNum);

                            // ig no need to do that
                            // listDiv.innerHTML = "";
                            // loadData();
                        });
                    });
                });

                b1.innerHTML = "&#9998;";
                b3.innerHTML = "&#10008;";

                divBtns.appendChild(b1);
                divBtns.appendChild(b2);
                divBtns.appendChild(b3);

                // Ids++;
            }
            sendData(tasksRetrieved);
        } 
    }); 
}

loadData();

function lineThroughTrue(idNum) {
    let pTag = document.getElementById(`tasks${idNum}`);
    pTag.style.textDecoration = "line-through";
}

function lineThroughFalse(idNum) {
    let pTag = document.getElementById(`tasks${idNum}`);
    pTag.style.textDecoration = "none";
}

function deleteTask(idNum) {
    // console.log(idNum);
    let taskDiv = document.getElementById(`list-div${idNum}`);
    taskDiv.remove();

    // listDiv.innerHTML = "";
    // loadData();
}

function editTask(idNum) {
    let pIdStr = `tasks${idNum}`;

    let rqst = new XMLHttpRequest();
    rqst.open('GET', '/getData');
    rqst.send();
    rqst.addEventListener('load', () => {

        let arr = JSON.parse(rqst.responseText);
        // console.log(arr, typeof arr, "inside edit task");

        let index = findIndex(idNum, arr);
        // console.log(index);
        let pTag = document.getElementById(pIdStr);
        let newTaskStr = prompt("Edit your task > ", pTag.innerText);
        newTaskStr = newTaskStr.trim();

        if (newTaskStr != "") {
            pTag.innerHTML = newTaskStr;
            arr[index].T = newTaskStr;
        } else {
            alert("Task empty!");
        }
        // console.log(arr,"line 255",typeof arr);

        sendData(arr);
    });
}

function findIndex(taskIdStr, newVar) {
    for (let i = 0; i < newVar.length; i++) {
        if (newVar[i].id == taskIdStr) return i;
    }
    return -1;
}

function sendData(data){
    let request = new XMLHttpRequest();
    request.open("POST", "/addData");
    request.setRequestHeader('Content-Type',"application/json");
    request.send(JSON.stringify(data));
    request.addEventListener('load', () => {
        // console.log('respnse came bck');
    });
}