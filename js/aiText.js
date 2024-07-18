let conversationHistory = [
    { role: "system", content: "You are a helpful assistant." }
];

document.getElementById('sendButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText');
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const responseElement = document.createElement('div');
    responseElement.classList.add('response');

    let myKey = "";
    try {
        myKey = await findMyKey("openAiText");
        if (!responseElement) {
            console.error('Response element not found');
            return;
        }
    } catch (error) {
        console.error("Error in try block: ", error.message);
    }
    loadingSpinner.style.display = 'block'; // Show the spinner

    // Appending user message to chat history
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = inputText.value;
    chatHistory.appendChild(userMessageElement);

    // Add user message to conversation history
    conversationHistory.push({ role: "user", content: inputText.value });

    inputText.value = "";

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myKey
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: conversationHistory,
                max_tokens: 1000
            })
        });

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        // Add assistant message to conversation history
        conversationHistory.push({ role: "assistant", content: assistantMessage });

        responseElement.textContent = assistantMessage;
        responseElement.classList.add('message', 'assistant-message');
        chatHistory.appendChild(responseElement);
        loadingSpinner.style.display = 'none';

        // Scroll to the bottom of chat history
        chatHistory.scrollTop = chatHistory.scrollHeight;
    } catch (error) {
        responseElement.textContent = `Error: ${error.message}`;
        chatHistory.appendChild(responseElement);
        loadingSpinner.style.display = 'none';
    }
});
