let loadingMessageElement;

function showLoading(message = 'Loading...') {
    // Create the loading message if it doesn't already exist
    if (!loadingMessageElement) {
        loadingMessageElement = document.createElement('div');
        loadingMessageElement.classList.add('myModal');
        loadingMessageElement.id = 'loadingMessage';

        // Create a div for the message
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('loadingMessage');
        messageDiv.textContent = message;

        loadingMessageElement.appendChild(messageDiv);
        document.body.appendChild(loadingMessageElement);  // Append it to the body
    }

    // Ensure the modal is visible
    loadingMessageElement.style.display = 'flex'; // Use 'flex' to center the content
}

function hideLoading() {
    if (loadingMessageElement) {
        loadingMessageElement.style.display = 'none'; // Hide the modal
    }
}
