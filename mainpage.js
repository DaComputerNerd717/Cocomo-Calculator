const salary = 74229;

var intermediate = true;

//reset everything on reload
window.onload = function(){
    //reset cocomo and input selectors
    document.getElementById("basicSelect").checked = false;
    document.getElementById("intermediateSelect").checked = true;
    document.getElementById("klocSelect").checked = false;
    document.getElementById("fpSelect").checked = true;
    //reset drivers
    selectedDrivers = [
        2, //required software reliability
        2, //size of database
        2, //project complexity
        2, //performance constraints
        2, //memory constraints
        2, //VM environment volatility
        2, //required turnabout time
        2, //analysis capability
        2, //application experience
        2, //software engineer capability
        2, //VM experience
        2, //Programming experience
        2, //SE methods
        2, //use of SE tools
        2 //development time
    ];
    var grid = document.getElementById("driverTable");
    for(let i = 1; i < grid.rows.length; i++){
        for(let j = 1; j < grid.rows[i].cells.length; j++){
            var cell = grid.rows[i].cells[j];
            if(cell.children.length > 0)
                cell.children[0].checked = (j == 3);
        }
    }
    //reset text boxes
    for (const e of document.getElementsByClassName("clearOnReload")) {
        e.value = "";
    }
}

function hideIntermediate(){
    intermediate = false;
    for(let i = 0; i < 8; i++){
        var intermediate = document.getElementsByClassName("intermediateOnly");
        var bordered = document.getElementsByClassName("bordered");
        var borderedB = document.getElementsByClassName("borderedb");
        var borderedR = document.getElementsByClassName("borderedr");

        
        for(element of intermediate){
            element.classList.remove("intermediateOnly");
            element.classList.add("intermediateOnlyH");
        }
        for(element of bordered) {
            element.classList.remove("bordered");
            element.classList.add("borderedH");
        }
        for(element of borderedB){
            element.classList.remove("borderedb");
            element.classList.add("borderedbH");
        }
        for(element of borderedR) {
            element.classList.remove("borderedr");
            element.classList.add("borderedrH");
        }
    }
}

function showIntermediate(){
    intermediate = true;
    for(let i = 0; i < 8; i++){
        var intH = document.getElementsByClassName("intermediateOnlyH");
        var borderedH = document.getElementsByClassName("borderedH");
        var borderedbH = document.getElementsByClassName("borderedbH");
        var borderedrH = document.getElementsByClassName("borderedrH");
        for(element of intH) {
            element.classList.remove("intermediateOnlyH");
            element.classList.add("intermediateOnly");
        }
        for(element of borderedH) {
            element.classList.remove("borderedH");
            element.classList.add("bordered");
        }
        for(element of borderedbH) {
            element.classList.remove("borderedbH");
            element.classList.add("borderedb");
        }
        for(element of borderedrH) {
            element.classList.remove("borderedrH");
            element.classList.add("borderedr");
        }
    }
}

function hideFP(){
    for(let i = 0; i < 8; i++){
        var fpOnly = document.getElementsByClassName("fpOnly");
        for(element of fpOnly) {
            element.classList.remove("fpOnly");
            element.classList.add("fpOnlyH");
        }
    }
}

function showFP(){
    for(let i = 0; i < 8; i++){
        var fpOnly = document.getElementsByClassName("fpOnlyH");
        for(element of fpOnly) {
            element.classList.remove("fpOnlyH");
            element.classList.add("fpOnly");
        }
    }
}

var costdrivers = [
    [0.75, 0.88, 1, 1.15, 1.4, -1], //required software reliability
    [-1, 0.94, 1, 1.08, 1.16, -1], //size of database
    [0.7, 0.85, 1, 1.15, 1.3, 1.65], //project complexity
    [-1, -1, 1, 1.11, 1.3, 1.66], //performance constraints
    [-1, -1, 1, 1.06, 1.21, 1.56], //memory constraints
    [-1, 0.87, 1, 1.15, 1.3, -1], //VM environment volatility
    [-1, 0.87, 1, 1.07, 1.15, -1], //required turnabout time
    [1.46, 1.19, 1, 0.86, 0.71, -1], //analysis capability
    [1.29, 1.13, 1, 0.91, 0.82, -1], //application experience
    [1.42, 1.17, 1, 0.86, 0.7, -1], //software engineer capability
    [1.21, 1.1, 1, 0.9, -1, -1], //VM experience
    [1.14, 1.07, 1, 0.95, -1, -1], //Programming experience
    [1.24, 1.1, 1, 0.91, 0.82, -1], //SE methods
    [1.24, 1.1, 1, 0.91, 0.83, -1], //use of SE tools
    [1.23, 1.08, 1, 1.04, 1.1, -1] //development time
];

var consts = [
    //a_basic a_advanced b c d
    [3.2, 2.4, 1.05, 2.5, 0.38], //organic
    [3, 3, 1.12, 2.5, 0.35], //semi-detached
    [2.8, 3.6, 1.12, 2.5, 0.32] //embedded
];

class Result{
    constructor(effort, devTime, devs, wages){
        this.effort = effort;
        this.devTime = devTime;
        this.devs = devs;
        this.wages = wages;
    }
}

var selectedDrivers = [
    2, //required software reliability
    2, //size of database
    2, //project complexity
    2, //performance constraints
    2, //memory constraints
    2, //VM environment volatility
    2, //required turnabout time
    2, //analysis capability
    2, //application experience
    2, //software engineer capability
    2, //VM experience
    2, //Programming experience
    2, //SE methods
    2, //use of SE tools
    2 //development time
];

//get element of table cell
//document.getElementById(tableID).rows[row].cells[cell].children[0].checked
//document.getElementById("fpSelect").getAttribute("value")

function buildSelectedList(){
    var row = 1;
    for(let i = 0; i < costdrivers.length; i++){
        var currentRow = document.getElementById("driverTable").rows[row];
        if(!currentRow.cells[3] || !currentRow.cells[3].children[0]){
            row++;
            currentRow = document.getElementById("driverTable").rows[row];
        }
        for(let j = 0; j < costdrivers[i].length; j++){
            if(!currentRow.cells[j+1] || 
               !currentRow.cells[j+1].children[0]){
                continue;
            }
            
            if(currentRow.cells[j+1].children[0].checked){
                selectedDrivers[i] = j;
            }
        }
        row++;
    }
    return selectedDrivers;
}

function calculateKLOC(){
    var content = parseFloat(document.getElementById("workInput").value);
    if(document.getElementById("fpSelect").checked){
        content *= parseFloat(document.getElementById("langSelect").value) * 0.001;
    }
    return content;
}

function getConstants(){
    var constants = [0,0,0,0];
    var sizeType = document.getElementById("sizingType").value;
    var row;
    if(sizeType === "organic"){
        row = 0;
    }else if(sizeType === "semi-detached"){
        row = 1;
    }else if(sizeType === "embedded"){
        row = 2;
    }
    if(document.getElementById("basicSelect").checked){
        constants[0] = consts[row][0]; 
    }else{
        constants[0] = consts[row][1];
    }
    constants[1] = consts[row][2];
    constants[2] = consts[row][3];
    constants[3] = consts[row][4];
    return constants;
}

function calculateIntermediate(constants, kloc, eaf){
    var effort = constants[0] * (kloc ** constants[1]) * eaf;
    var devTime = constants[2] * (effort ** constants[3]);
    var devs = effort / devTime;
    var wages = effort * salary; //salary*time*devs = total cost
    return new Result(effort, devTime, devs, wages);
}

function calculateBasic(constants, kloc){
    var effort = constants[0] * (kloc ** constants[1]);
    var devTime = constants[2] * (effort ** constants[3]);
    var devs = effort / devTime;
    var wages = effort * salary; //salary*time*devs = total cost
    return new Result(effort, devTime, devs, wages);
}

function onCalculateClick(){
    var content = document.getElementById("workInput").value;
    if(content == 0 || !content.match(/^\d+(?:\.\d+)?$/)){ //regex matches any positive number
        if(document.getElementById("fpSelect").checked){
            alert("You must enter a positive number for the amount of function points");
        }else{
            alert("You must enter a positive number for the amount of lines of code");
        }
        return false;
    }
    var constants = getConstants();
    var kloc = calculateKLOC();
    var eaf = 1;
    var result;

    if(intermediate){
        buildSelectedList();
        for(let i = 0; i < selectedDrivers.length; i++){
            eaf *= costdrivers[i][selectedDrivers[i]];
        }
        result = calculateIntermediate(constants, kloc, eaf);
    }else{
        result = calculateBasic(constants, kloc);
    }
    displayResult(result);
}

function displayResult(result){
    document.getElementById("effortBox").value = result.effort;
    document.getElementById("timeBox").value = result.devTime;
    document.getElementById("devsBox").value = result.devs;
    document.getElementById("costBox").value = result.wages;
}