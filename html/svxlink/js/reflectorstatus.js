var theadList = ["NODE", "Transmitting", "TalkGroup"];

window.addEventListener('DOMContentLoaded', function () {
    document.querySelector(".title").textContent = "CRRP SVXReflector Status";
});

function createTable(data) {
    var table = document.createElement('table');
    table.classList.add("table");

    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    thead.appendChild(tr);

    theadList.forEach(function (title) {
        var th = document.createElement('th');
        th.textContent = title;
        tr.appendChild(th);
    });

    var tbody = document.createElement('tbody');

    data.forEach(function (item) {
        var tr = document.createElement('tr');

        item.forEach(function (value, index) {
            var td = document.createElement('td');
            if (index === 1) {
                td.textContent = value ? "Talking" : "Idle";
            } else {
                td.textContent = value;
            }
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

function createPage(data) {
    var container = document.getElementById('InicioBlocos');
    container.innerHTML = '';
    container.appendChild(createTable(data));
}

function getCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return "";
}

function updateVisits() {
    var cookie = getCookie("cookie");
    var visits = cookie ? parseInt(cookie) + 1 : 1;
    document.cookie = "cookie=" + visits + "; expires=365";
    var visitsElement = document.getElementById("visits");
    if (visitsElement) {
        visitsElement.textContent = "Visits: " + visits;
    }
}

function atualizaStatus() {
    $.getJSON("/reflectorstatus/statusalltgs", function (reflectorStatusRaw) {
        var nodes = reflectorStatusRaw["nodes"];
        var nodeList = Object.entries(nodes).map(function ([node, info]) {
            return [node, info["isTalker"], info["tg"]];
        });
        createPage(nodeList);
    });
    updateVisits();
}

setInterval(atualizaStatus, 700);
