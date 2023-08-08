const logsContainers = document.querySelectorAll('.logs-container');

const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

function updateLogContainer(container, log) {
    const scrollToEnd = container.scrollTop === container.scrollHeight - container.clientHeight;
    const titleElement = container.querySelector('.logs-title');
    container.innerHTML = '';
    container.appendChild(titleElement); // Adicione o título de volta
    container.insertAdjacentHTML('beforeend', log);
    if (scrollToEnd) {
        container.scrollTop = container.scrollHeight - container.clientHeight;
    }
}

function formatLog(log) {
    const lines = log.split('\n');
    const formattedLines = lines.map(line => {
        const timestampMatch = line.match(/^(\w{3} \w{3} +\d+ \d{2}:\d{2}:\d{2} \d{4}):/);
        if (timestampMatch) {
            const timestamp = timestampMatch[1];
            const formattedTimestamp = `<span class="timestamp">${timestamp}</span>`;
            const remainingText = line.slice(timestamp.length + 2); // +2 to skip space and colon
            return `${formattedTimestamp} ${remainingText}`;
        } else {
            return line;
        }
    });
    return formattedLines.join('\n');
}

function connectToSSE() {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = event => {
        const { log, index } = JSON.parse(event.data);
        const formattedLog = formatLog(log);
        updateLogContainer(logsContainers[index], formattedLog);
    };

    eventSource.onerror = () => {
        eventSource.close();
        setTimeout(connectToSSE, 1000); // Reconnect after 1 second
    };
}

function loadInitialLogs() {
    fetch('/api/logs')
        .then(response => response.json())
        .then(data => {
            data.forEach((log, index) => {
                const formattedLog = formatLog(log);
                updateLogContainer(logsContainers[index], formattedLog);
            });
            connectToSSE();
        });
}

loadInitialLogs();
