var statusNodes = {};
let nodeList = [];
//const divPrincipal = document.querySelector("#InicioBlocos");
document.querySelector(".titulo-principal").textContent = "CRRP SVXReflector Status";


function makeList(item, statusNodeItem ){



}


function makePage(){
    var theTable = document.createElement('table');
    let nodeList = [];
    let nodeListShow = '';
    tr = document.createElement('tr');
    tr1 = document.createElement('tr');
    titulo = ["NODE","Transmitting","TalkGroup"]
    var titulosLength = titulo.length;
    var th = [];
    
    for (var k = 0 ; k < titulosLength; k++) {
        th[k] = document.createElement('th'); 
        th[k].appendChild(document.createTextNode(titulo[k]));
        tr1.appendChild(th[k]);
    }
    theTable.appendChild(tr1);
    document.getElementById('InicioBlocos').children
    Object.keys(statusNodes).forEach(item => {
        nodeList.push([item,statusNodes[item]["isTalker"],statusNodes[item]["tg"]])
    });
    var tr = [];
    var td = [];
    var nodes = nodeList.length;
    for (var i = 0; i < nodes; i++) {
        tr[i] = document.createElement('tr'); 
        var nodesVal = nodeList[i].length;
        nodeStatus = nodeList[i];
        for (var j = 0 ; j < nodesVal; j++) {
            td[j] = document.createElement('td'); 
            td[j].appendChild(document.createTextNode(nodeStatus[j]));
            tr[i].appendChild(td[j]);
            
        }
        
        theTable.appendChild(tr[i]);
        
    }
    
    document.getElementById('InicioBlocos').replaceChildren(theTable)
    //console.log(theTable.innerHTML)
        
}






function atualizaStatus() {
    $.getJSON("/reflectorstatus/statusalltgs", function (reflectorStatusRaw) {
        statusNodes = reflectorStatusRaw["nodes"]
    });
};


setInterval(function () {
    atualizaStatus();
    makePage();

}, 700)