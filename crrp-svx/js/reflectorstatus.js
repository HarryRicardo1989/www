var theadList = ["NODE","Transmitting","TalkGroup"];
document.querySelector(".titulo-principal").textContent = "CRRP SVXReflector Status";

function makeThead(array){
    let th = [];
    let tr = [];
    let h2 = [];
    let titulosLength = array.length;
    thead = document.createElement('thead');
    tr = document.createElement('tr');
    
    for (let k = 0 ; k < titulosLength; k++) {
        h2[k] = document.createElement('h2'); 
        th[k] = document.createElement('th'); 
        h2[k].appendChild(document.createTextNode(array[k]));
        th[k].appendChild(h2[k]);
        tr.appendChild(th[k]);
    }

    thead.appendChild(tr);
    return thead;
}

function makeTbody(array){
    let tr = [];
    let td = [];
    let h3 = [];
    tbody = document.createElement('tbody');
    let nodes = array.length;
    for (let i = 0; i < nodes; i++) {
        tr[i] = document.createElement('tr'); 
        let nodesVal = array[i].length;
        nodeStatus = array[i];
        for (let j = 0 ; j < nodesVal; j++) {
            h3[j] = document.createElement('h3'); 
            td[j] = document.createElement('td'); 
            h3[j].appendChild(document.createTextNode(nodeStatus[j]));
            td[j].appendChild(h3[j]);
            tr[i].appendChild(td[j]);
        }
        tbody.appendChild(tr[i]);
    }
    return tbody;
}

function makeNodeList(objNodes){
    let nodeList = [];
    Object.keys(objNodes).forEach(element => {
        nodeList.push([element,objNodes[element]["isTalker"],objNodes[element]["tg"]]);
    });

    return nodeList;
}

function makeTables(tHead,tBody){
    table = document.createElement('table');
    table.classList.add("Blocos");
    table.appendChild(tHead);
    table.appendChild(tBody);

    return table;
}

function makeDiv(array){
    div1 = [];
    div = document.createElement('div');
    
    let arrayLength = array.length;
    for (let i = 0 ; i < arrayLength; i++) {
        div.appendChild(array[i]);
    }

    return div;
}

function makePage(objRawNodes){
    nodeList = makeNodeList(objRawNodes);
    nodeListlength = nodeList.length;
    metadeNodeList = Math.floor(nodeListlength/2);
    primeiraMetade = metadeNodeList+(nodeListlength%2);
    newNodeList1 = nodeList.slice(0,primeiraMetade);
    newNodeList2 = nodeList.slice(primeiraMetade,nodeListlength);

    table1 = makeTables(makeThead(theadList),makeTbody(newNodeList1));
    table2 = makeTables(makeThead(theadList),makeTbody(newNodeList2));
    div = makeDiv([table1, table2]);

    document.getElementById('InicioBlocos').replaceChildren(div);
        
}
function atualizaStatus() {
    $.getJSON("/reflectorstatus/statusalltgs", function (reflectorStatusRaw) {
        makePage(reflectorStatusRaw["nodes"]);
    });
};


setInterval(function () {
    atualizaStatus();
    

}, 700)




