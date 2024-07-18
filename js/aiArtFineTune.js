const button2 = document.getElementById('fineTuneButton');
button2.addEventListener('click', async (e) => {
    e.preventDefault();
    const file = document.getElementById('imageToEdit');
    const fineTuneInputText = document.getElementById('inputTextFineTuning');
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');

    if (fineTuneInputText.value.trim() == "") {
        alert("Fine tuning input can't be empty");
        return;
    }
    console.log("file.files.length: ", file.files.length);
    console.log("file.files[0]: ", file.files[0].name);
    console.log("file.files: ", file.files);
    if (file.files.length == 0) {
        alert("Image upload can't be empty")
        return;
    }
    let myKey = "";
    try {
        myKey = await findMyKey("openAiArt");
        if (!myKey) {
            console.error('API key not found');
            return;
        }
    } catch (error) {
        console.error("Error in try block: ", error.message);
    }
    loadingSpinner.style.display = 'block'; // Show the spinner
    button2.style.display = 'none';

    /* Appending user message to chat history
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = inputText.value;
    chatHistory.insertBefore(userMessageElement, loadingSpinner);

    // Add user message to conversation history
    if (conversationHistory.trim() != "" && inputText.value.trim() != "") conversationHistory += ", ";
    conversationHistory += inputText.value;
    trainOfThought.textContent = conversationHistory;
    inputText.value = "";
    */
    const formData = new FormData();
    formData.append('image', file.files[0]);
    formData.append('prompt', fineTuneInputText.value);
    formData.append('n', '1');
    formData.append('size', resolution);
    try {
        const response = await fetch('https://api.openai.com/v1/images/edits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myKey
            },
            body: JSON.stringify({
                image: file.files[0],
                prompt: fineTuneInputText.value,
                n: 1,
                size: resolution,
            })
        });

        const data = await response.json();
        const imageUrl = data.data[0].url;

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('generated-image')

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('assistant-message');
        imageContainer.appendChild(imageElement);

        chatHistory.insertBefore(imageContainer, loadingSpinner);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';
        chatHistory.scrollTop = chatHistory.scrollHeight;

    } catch (error) {
        const imageContainer = document.createElement('div');
        imageContainer.textContent = `Error: ${error.message}`;
        chatHistory.appendChild(imageContainer);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';
    }
});
