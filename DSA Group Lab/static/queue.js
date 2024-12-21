// Enqueue function
function enqueue() {
    const data = document.getElementById("enqueue-input").value;
    if (!data) {
        alert("Please enter some data to enqueue!");
        return;
    }

    // Send data to server for enqueueing
    fetch('/enqueue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${data}`
    })
    .then(response => response.json())
    .then(data => {
        updateQueueDisplay(data.queue);
        document.getElementById("enqueue-input").value = '';  // Clear input
    })
    .catch(error => console.error('Error:', error));
}

// Dequeue function
function dequeue() {
    // Send request to server for dequeueing
    fetch('/dequeue', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(`Removed: ${data.removed}`);
        } else {
            alert(data.message);
        }
        updateQueueDisplay(data.queue);
    })
    .catch(error => console.error('Error:', error));
}

// Update the queue display
function updateQueueDisplay(queue) {
    const queueDisplay = document.getElementById("queue-display");
    if (queue.length > 0) {
        queueDisplay.textContent = `Queue: [${queue.join(", ")}]`;
    } else {
        queueDisplay.textContent = "Queue is empty";
    }
}
