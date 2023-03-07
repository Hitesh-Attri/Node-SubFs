let listDiv = document.getElementById('list-here');
let area = document.getElementById("input-box");
let tasksRetrieved;

let Ids = 0;

function eraseText() {
    if (area.value == "") {
        alert("Nothing to clear");
    }
    else {
        area.value = "";
    }
}

function addTask() {
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
            let tasksRetrieved = JSON.parse(rqst.responseText); // array here
            // console.log(tasksRetrieved, typeof tasksRetrieved);

            var div2 = document.createElement('div');
            div2.className = "list-div";
            let listDivIdStr = `list-div${Ids}`;
            div2.id = listDivIdStr;

            var pTag = document.createElement("p");
            pTag.className = "tasks";
            let pTagIdStr = `tasks${Ids}`;
            pTag.id = pTagIdStr;
            pTag.innerText = str;
            div2.appendChild(pTag);

            let obj = {
                T: str,
                isCheck: 0,
                id: pTagIdStr
            }

            tasksRetrieved.push(obj);
            // tasksRetrieved = JSON.stringify(tasksRetrieved);

            // POST rqst
            let rqst2 = new XMLHttpRequest();
            rqst2.open("POST", "/addData");
            rqst2.setRequestHeader("Content-Type", "application/json");
            rqst2.send(JSON.stringify(tasksRetrieved));
            // console.log(typeof tasksRetrieved, tasksRetrieved);
            rqst2.addEventListener('load', () => {

                var divBtns = document.createElement('div');
                divBtns.className = "div-btns";
                let divBtnsIdStr = `div-btns${Ids}`;
                divBtns.id = divBtnsIdStr;
                div2.appendChild(divBtns);

                var b1 = document.createElement('button');
                b1.className = "editBtn";
                let b1IdStr = `editBtn${Ids}`;
                b1.id = b1IdStr;
                b1.addEventListener('click', function () {
                    let editBtnIdStr = this.id;
                    let editBtnIdNum = parseInt(editBtnIdStr.replace("editBtn", ""));
                    // console.log(editBtnIdNum, "before calling editTask ()")
                    editTask(editBtnIdNum);
                });

                var b2 = document.createElement('input');
                b2.setAttribute("type", "checkbox");
                b2.className = "checkBtn";
                let b2IdStr = `checkBtn${Ids}`;
                b2.id = b2IdStr;
                b2.addEventListener('change', function () {
                    let checkBtnIdStr = this.id;
                    let checkBtnIdNum = parseInt(checkBtnIdStr.replace("checkBtn", ""));
                    if (this.checked) {
                        console.log("Checkbox is checked..");

                        lineThroughTrue(checkBtnIdNum);

                        // tasksRetrieved = JSON.parse(localStorage.getItem('tasks'));
                        let rqst7 = new XMLHttpRequest();
                        rqst7.open('GET','/getData');
                        rqst7.send();

                        rqst7.addEventListener('load',()=>{
                            
                            console.log(tasksRetrieved, checkBtnIdNum, "1");
                            tasksRetrieved[checkBtnIdNum].isCheck = 1;
                            console.log(tasksRetrieved, "2");
                            console.log("inside add b2 if listern", this.checked, tasksRetrieved[checkBtnIdNum].isCheck);

                            let rqst21 = new XMLHttpRequest();
                            rqst21.open("POST", "/addData");
                            rqst21.setRequestHeader("Content-Type", "application/json");
                            rqst21.send(JSON.stringify(tasksRetrieved));
                            console.log(typeof tasksRetrieved, tasksRetrieved);
                            
                            rqst21.addEventListener('load', () => {
                                console.log("response came 111");
                            });
                        }); 
                        // localStorage.setItem("tasks",JSON.stringify(tasksRetrieved));
                    } else {
                        console.log("Checkbox is not checked..");
                        lineThroughFalse(checkBtnIdNum);

                        tasksRetrieved[checkBtnIdNum].isCheck = 0;
                        // localStorage.setItem("tasks", JSON.stringify(tasksRetrieved));
                    }

                    let rqst8 = new XMLHttpRequest();
                    rqst8.open('POST','addData');
                    rqst8.setRequestHeader('Content-Type','application/json');
                    rqst8.send(JSON.stringify(tasksRetrieved));
                    rqst8.addEventListener('load',()=>{
                        console.log("res came back");
                    });
                });

                var b3 = document.createElement('button');
                b3.className = "deleteBtn";
                let b3IdStr = `deleteBtn${Ids}`;
                b3.id = b3IdStr;

                // let newVar = localStorage.getItem('tasks');
                // newVar = JSON.parse(newVar);
                

                b3.addEventListener('click', function () {
                    let dltBtnIdStr = this.id;
                    let dltBtnIdNum = parseInt(dltBtnIdStr.replace("deleteBtn", ""));

                    // let arrS = localStorage.getItem("tasks");
                    // arrS = JSON.parse(arrS);

                    let rqst9 = new XMLHttpRequest();
                    rqst9.open('GET','/getData');
                    rqst9.send();
                    rqst9.addEventListener('load',()=>{
                        let arrS = JSON.parse(rqst9.responseText);
                        
                        // console.log(arrS, typeof arrS);
                        
                        console.log(dltBtnIdNum, typeof arrS, arrS,"156");
                        
                        arrS.splice(findIndex(`tasks${dltBtnIdNum}`, arrS), 1);
                        
                        // arrS = JSON.stringify(arrS);
                        // localStorage.setItem('tasks', arrS);
                        

                        let rqst10 = new XMLHttpRequest();
                        rqst10.open('POST','/addData');
                        rqst10.setRequestHeader('Content-Type','application/json');
                        rqst10.send(JSON.stringify(arrS));
                        rqst10.addEventListener('load',()=>{
                            console.log("res came back");
                            deleteTask(dltBtnIdNum);

                            listDiv.innerHTML = "";
                            loadData();
                        });

                    });

                });

                b1.innerHTML = "&#9998;";
                b3.innerHTML = "&#10008;";

                divBtns.appendChild(b1);
                divBtns.appendChild(b2);
                divBtns.appendChild(b3);
                listDiv.appendChild(div2);
                Ids++;
                eraseText();
            });
        });
    }
}

area.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        // Call your function here
        addTask();
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
        // console.log(rqst.responseText, typeof rqst.responseText);
        let tasksRetrieved = JSON.parse(rqst.responseText);
        console.log(typeof tasksRetrieved, tasksRetrieved, "onload first");
        // return;
        if (tasksRetrieved.length != 0) {

            for (let i = 0; i < tasksRetrieved.length; i++) {
                // sleep(1000);
                var div2 = document.createElement('div');
                div2.className = "list-div";
                // let listDivIdStr = `list-div${Ids}`;
                let listDivIdStr = `list-div${i}`;
                div2.id = listDivIdStr;
                listDiv.appendChild(div2);

                var pTag = document.createElement("p");
                pTag.className = "tasks";
                // let pTagIdStr = `tasks${Ids}`;
                let pTagIdStr = `tasks${i}`;
                pTag.id = pTagIdStr;
                // let arr = localStorage.getItem('tasks');

                // arr = JSON.parse(arr);
                // tasksRetrieved[i].id = `tasks${Ids}`;
                tasksRetrieved[i].id = `tasks${i}`;
                pTag.innerText = tasksRetrieved[i].T;
                if (tasksRetrieved[i].isCheck == 1) {
                    pTag.style.textDecoration = "line-through";
                }
                div2.appendChild(pTag);

                var divBtns = document.createElement('div');
                divBtns.className = "div-btns";
                // let divBtnsIdStr = `div-btns${Ids}`;
                let divBtnsIdStr = `div-btns${i}`;
                divBtns.id = divBtnsIdStr;
                div2.appendChild(divBtns);

                // arr = JSON.stringify(arr);

                // localStorage.setItem('tasks',arr);

                let rqst1 = new XMLHttpRequest();
                rqst1.open("POST", "/addData");
                rqst1.setRequestHeader("Content-Type", "application/json");
                rqst1.send(JSON.stringify(tasksRetrieved));
                rqst1.addEventListener('load', () => {

                });

                var b1 = document.createElement('button');
                b1.className = "editBtn";
                // let b1IdStr = `editBtn${Ids}`;
                let b1IdStr = `editBtn${i}`;
                b1.id = b1IdStr;
                b1.addEventListener('click', function () {
                    let editBtnIdStr = this.id;
                    let editBtnIdNum = parseInt(editBtnIdStr.replace("editBtn", ""));
                    editTask(editBtnIdNum);
                });

                var b2 = document.createElement('input');
                b2.setAttribute("type", "checkbox");
                b2.className = "checkBtn";
                // let b2IdStr = `checkBtn${Ids}`;
                let b2IdStr = `checkBtn${i}`;
                b2.id = b2IdStr;
                if (tasksRetrieved[i].isCheck == 1) {
                    b2.checked = true;
                }
                b2.addEventListener('change', function () {
                    let checkBtnIdStr = this.id;
                    let checkBtnIdNum = parseInt(checkBtnIdStr.replace("checkBtn", ""));
                    console.log(typeof checkBtnIdNum, checkBtnIdNum);

                    if (this.checked) {
                        console.log("Checkbox is checked..");
                        lineThroughTrue(checkBtnIdNum);

                        let rqst4 = new XMLHttpRequest();
                        rqst4.open("GET", "/getData");
                        rqst4.send();
                        rqst4.addEventListener("load", () => {
                            tasksRetrieved = JSON.parse(rqst4.responseText);
                            let checkBtnIdOnListen = this.id;
                            checkBtnIdOnListen = parseInt(checkBtnIdStr.replace("checkBtn", ""));
                            tasksRetrieved[checkBtnIdOnListen].isCheck = 1;

                            // tasksRetrieved = JSON.stringify(tasksRetrieved);
                            // localStorage.setItem("tasks",taskArrJSONStr);
                            let rqst6 = new XMLHttpRequest();
                            // rqst6.setRequestHeader("Content-Type", "application/json");
                            rqst6.open("POST", "/addData");
                            rqst6.setRequestHeader('Content-Type',"application/json");
                            rqst6.send(JSON.stringify(tasksRetrieved));
                            rqst6.addEventListener('load', () => {

                                console.log("checkBtnIdNum > ", checkBtnIdOnListen);
                            });
                            console.log("inside b2 if listern", this.checked, tasksRetrieved[checkBtnIdOnListen].isCheck);
                        });
                        // tasksRetrievedArr = localStorage.getItem('tasks');
                        // tasksRetrievedArr = JSON.parse(tasksRetrievedArr);
                        // console.log("inside b2 if listern", this.checked, tasksRetrieved[i].isCheck);
                    }
                    else {
                        console.log("Checkbox is not checked..");
                        lineThroughFalse(checkBtnIdNum);
                        let rqst41 = new XMLHttpRequest();
                        rqst41.open("GET", "/getData");
                        rqst41.send();
                        rqst41.addEventListener("load", () => {
                            tasksRetrieved = JSON.parse(rqst41.responseText);
                            console.log(tasksRetrieved, typeof tasksRetrieved,"324");
                            // tasksRetrieved[i].isCheck = 1;
                            let checkBtnIdOnListen = this.id;
                            checkBtnIdOnListen = parseInt(checkBtnIdStr.replace("checkBtn", ""));
                            tasksRetrieved[checkBtnIdOnListen].isCheck = 0;

                            console.log(tasksRetrieved, typeof tasksRetrieved,"330");

                            // let tasksRetrieved = JSON.stringify(tasksRetrieved);
                            // localStorage.setItem("tasks",taskArrJSONStr);
                            let rqst6 = new XMLHttpRequest();
                            rqst6.open("POST", "/addData");
                            // rqst6.setRequestHeader("Content-Type", "application/json");
                            rqst6.setRequestHeader('Content-Type',"application/json");
                            rqst6.send(JSON.stringify(tasksRetrieved));
                            rqst6.addEventListener('load', () => {

                                console.log('i :>> ', i, "checkBtnIdNum > ", checkBtnIdNum);
                            });
                            console.log("inside b2 if listern", this.checked, tasksRetrieved[i].isCheck);
                        });
                        // tasksRetrievedArr = localStorage.getItem('tasks');
                        // tasksRetrievedArr = JSON.parse(tasksRetrievedArr);
                        // console.log("inside b2 if listern", this.checked, tasksRetrieved[i].isCheck);
                    }

                
                });

                // console.log(newVar, typeof newVar, "< inside load function"," i>",i);

                var b3 = document.createElement('button');
                b3.className = "deleteBtn";
                let b3IdStr = `deleteBtn${i}`;
                b3.id = b3IdStr;
                b3.addEventListener('click', function () {
                    let dltBtnIdStr = this.id;
                    console.log("on load dlt btn. idstr>", dltBtnIdStr);
                    let dltBtnIdNum = parseInt(dltBtnIdStr.replace("deleteBtn", ""));

                    // let arrS = localStorage.getItem("tasks");
                    // arrS = JSON.parse(arrS);

                    let rqst5 = new XMLHttpRequest();
                    rqst5.open("GET", "/getData");
                    rqst5.send();
                    rqst5.addEventListener("load", () => {
                        tasksRetrieved = JSON.parse(rqst5.responseText);

                        let pTagOther = document.getElementById(`tasks${dltBtnIdNum}`)
                        console.log(pTagOther.innerText);
                        tasksRetrieved.splice(findIndex(`tasks${dltBtnIdNum}`, tasksRetrieved), 1);
                        console.log(findIndex(pTagOther.innerText, tasksRetrieved, "< inside onload"));
                        console.log(pTagOther.innerText, typeof tasksRetrieved);

                        let postRqst2 = new XMLHttpRequest();
                        postRqst2.open("POST", "/addData");
                        postRqst2.setRequestHeader("Content-Type", "application/json");
                        postRqst2.send(JSON.stringify(tasksRetrieved));
                        postRqst2.addEventListener('load', () => {
                            console.log("res cam back, 399");
                            deleteTask(dltBtnIdNum);
                            listDiv.innerHTML = "";
                            loadData();
                        });

                    });

                    // arrS = JSON.stringify(arrS);
                    // localStorage.setItem('tasks',arrS);


                    // deleteTask(dltBtnIdNum);
                    
                });

                b1.innerHTML = "&#9998;";
                b3.innerHTML = "&#10008;";

                divBtns.appendChild(b1);
                divBtns.appendChild(b2);
                divBtns.appendChild(b3);

                Ids++;

            }

            let postRqst3 = new XMLHttpRequest();
            postRqst3.open('POST', '/addData');
            postRqst3.setRequestHeader('Content-Type', "application/json");
            console.log(typeof tasksRetrieved, tasksRetrieved, " end of load data function");
            postRqst3.send(JSON.stringify(tasksRetrieved));
            postRqst3.addEventListener('load', () => {
                console.log('post respnse');
            });

        } 
    }); 
}

loadData();

function lineThroughTrue(idNum) {
    let pIdStr = `tasks${idNum}`;
    let pTag = document.getElementById(pIdStr);
    pTag.style.textDecoration = "line-through";
}

function lineThroughFalse(idNum) {
    let pIdStr = `tasks${idNum}`;
    let pTag = document.getElementById(pIdStr);
    pTag.style.textDecoration = "none";
}

function deleteTask(idNum) {
    console.log(idNum);
    let taskDivIdStr = `list-div${idNum}`;
    let taskDiv = document.getElementById(taskDivIdStr);

    taskDiv.remove();

    // listDiv.innerHTML = "";
    // loadData();
}

function editTask(idNum) {
    let pIdStr = `tasks${idNum}`;

    let rqst = new XMLHttpRequest();
    rqst.open('GET', 'getData');
    rqst.send();
    rqst.addEventListener('load', () => {

        // let arr = localStorage.getItem('tasks');
        let arr = JSON.parse(rqst.responseText);
        console.log(arr, typeof arr, "inside edit task");
        // arr = JSON.parse(arr);

        let index = findIndex(pIdStr, arr);
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
        console.log(arr,"line 484",typeof arr);
        let postRqst = new XMLHttpRequest();
        postRqst.open("POST", "/addData");
        postRqst.setRequestHeader('Content-Type',"application/json");
        postRqst.send(JSON.stringify(arr));
        postRqst.addEventListener('load', () => {
            console.log("data updated. res came back.")
        });

        // arr = JSON.stringify(arr);
        // localStorage.setItem('tasks', arr);
    });
}

function findIndex(taskIdStr, newVar) {
    for (let i = 0; i < newVar.length; i++) {
        if (newVar[i].id == taskIdStr) return i;
    }
    return -1;
}
