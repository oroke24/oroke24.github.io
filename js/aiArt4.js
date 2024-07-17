let conversationHistory2 = "";
const clearBuffer2 = document.getElementById('clearButton2');
clearBuffer2.addEventListener('click', async() => {
    conversationHistory2 = "";
});
const button2 = document.getElementById('sendButton2');
    button2.addEventListener('click', async () => {
    const inputText = document.getElementById('inputText2');
    const chatHistory = document.getElementById('chatHistory2');
    const loadingSpinner = document.getElementById('loadingSpinner4');
 

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
    

    // Appending user message to chat history
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = inputText.value;
    chatHistory.appendChild(userMessageElement);

    // Add user message to conversation history
    conversationHistory2 += inputText.value;

    inputText.value = "";
    

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myKey
            },
            body: JSON.stringify({
                prompt: conversationHistory2,
                n: 1,
                size: "1024x1024"
            })
        });

        const data = await response.json();
        const imageUrl = data.data[0].url;

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('generated-image')

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('assistant-message');
        imageContainer.textContent = conversationHistory2;
        imageContainer.appendChild(imageElement);
        // Add assistant message to conversation history
        //conversationHistory.push({ role: "assistant", content: assistantMessage });
        conversationHistory2 += ", ";

        chatHistory.appendChild(imageContainer);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';

        // Scroll to the bottom of chat history
        chatHistory.scrollTop = chatHistory.scrollHeight;
    } catch (error) {
        ImageContainer.textContent = `Error: ${error.message}`;
        chatHistory.appendChild(imageContainer);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';
    }
});
