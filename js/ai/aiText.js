let conversationHistory = [
    { role: "system", content: "You are a helpful assistant." }
];
const currentAssistant = document.getElementById('currentAssistant');
currentAssistant.textContent = `Current Role Description: "${conversationHistory[0].content}"`; 

document.getElementById('sendButton').addEventListener('click', async (e) => {
    const inputText = document.getElementById('inputText');
    const assistantType = document.getElementById('assistantType');
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const model = document.getElementById('modelSelect');
    const responseElement = document.createElement('div');
    e.preventDefault();
    responseElement.classList.add('response');
    if (inputText.value.trim() == "") {
        alert("Input can't be empty");
        return;
    }

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
    chatHistory.insertBefore(userMessageElement, loadingSpinner);

    conversationHistory.push({ role: "user", content: inputText.value });
    // Add user message to conversation history
    if (assistantType.value.trim() != "") {
        conversationHistory[0] = {role: "system", content: assistantType.value};
        currentAssistant.textContent = `Current AI Role: "${assistantType.value}"`; 
        assistantType.value = "";
    }

    inputText.value = "";

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myKey
            },
            body: JSON.stringify({
                model: model.value,
                messages: conversationHistory,
            })
        });

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        // Add assistant message to conversation history
        conversationHistory.push({ role: "assistant", content: assistantMessage });

        responseElement.textContent = assistantMessage;
        responseElement.classList.add('message', 'assistant-message');
        chatHistory.insertBefore(responseElement, loadingSpinner);
        loadingSpinner.style.display = 'none';

        // Scroll to the bottom of chat history
        chatHistory.scrollTop = chatHistory.scrollHeight;
    } catch (error) {
        responseElement.textContent = `Error: ${error.message}`;
        chatHistory.appendChild(responseElement);
        loadingSpinner.style.display = 'none';
    }
});
