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
    const loadingSpinner = document.getElementById('loadingSpinner3');
    const resolution = document.getElementById('resolution').value;
    
    if (inputText.value.trim() == "") { return; }
    

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
    loadingSpinner3.style.display = 'block'; // Show the spinner
    button.style.display = 'none';

    // Appending user message to chat history
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = inputText.value;
    chatHistory.appendChild(userMessageElement);

    // Add user message to conversation history
    conversationHistory += inputText.value;
    trainOfThought.textContent = conversationHistory;

    inputText.value = "";
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myKey
            },
            body: JSON.stringify({
                prompt: conversationHistory,
                n: 1,
                size: resolution
            })
        });

        const data = await response.json();
        const imageUrl = data.data[0].url;

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('generated-image')

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('assistant-message');
        imageContainer.textContent = `${resolution} : ${conversationHistory}`;
        imageContainer.appendChild(imageElement);

        // Add assistant message to conversation history
        //conversationHistory.push({ role: "assistant", content: assistantMessage });
        conversationHistory += ", ";

        chatHistory.appendChild(imageContainer);
        loadingSpinner.style.display = 'none';
        button.style.display = 'block';

        // Scroll to the bottom of chat history
        chatHistory.scrollTop = chatHistory.scrollHeight;
    } catch (error) {
        const imageContainer = document.createElement('div');
        imageContainer.textContent = `Error: ${error.message}`;
        chatHistory.appendChild(imageContainer);
        loadingSpinner.style.display = 'none';
        button.style.display = 'block';
    }
});
