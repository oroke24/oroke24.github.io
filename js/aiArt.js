let conversationHistory = "";
let trainOfThought = document.getElementById('trainOfThought');
const clearBuffer = document.getElementById('clearButton');
clearBuffer.addEventListener('click', async () => {
    conversationHistory = "";
    trainOfThought.textContent = conversationHistory;
});

const button = document.getElementById('sendButton');
button.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputText = document.getElementById('inputText');
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resolution = document.getElementById('resolution').value;
    const style = document.getElementById('style');
    const quality = document.getElementById('quality');
    const type = document.getElementById('type');
    const theme = document.getElementById('theme');
    /*Redacted "text to include" portion
    const addText = document.getElementById('addText');
    let textToInclude = "";
    if(addText.value.trim() != "") textToInclude = `(Include this exact quote, "${addText.value}")`;
    */
    
    if (inputText.value.trim() == "" && conversationHistory.trim() == "") {
        alert("Train of thought can't be empty");
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
    button.style.display = 'none';
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Appending user message to chat history
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = inputText.value;
    chatHistory.insertBefore(userMessageElement, loadingSpinner);

    // Add user message to conversation history
    if(conversationHistory.trim() != "" && inputText.value.trim() != "") conversationHistory += ", ";
    conversationHistory += inputText.value;
    trainOfThought.textContent = conversationHistory;
    const description = `Description: ${conversationHistory};`

    inputText.value = "";
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myKey
            },
            body: JSON.stringify({
                prompt: type.value + theme.value + description,
                n: 1,
                size: resolution,
                style: style.value,
                quality: quality.value,
            })
        });

        const data = await response.json();
        const imageUrl = data.data[0].url;

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('generated-image')

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('assistant-message');
        imageContainer.textContent = `${resolution}, ${style.value}, ${quality.value}  : ${conversationHistory}`;
        imageContainer.appendChild(imageElement);

        chatHistory.insertBefore(imageContainer, loadingSpinner);
        loadingSpinner.style.display = 'none';
        button.style.display = 'block';

    } catch (error) {
        const imageContainer = document.createElement('div');
        imageContainer.textContent = `Error: ${error.message}`;
        chatHistory.insertBefore(imageContainer, loadingSpinner);
        loadingSpinner.style.display = 'none';
        button.style.display = 'block';
    }
});
