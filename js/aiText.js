/*--------------------------- Text completion API (Legacy) --------------------------------------
-------------------------------------------------------------------------------------------------*/
document.getElementById('sendButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const responseElement = document.getElementById('response');
    let myKey = "";
    try {
        myKey = await findMyKey("openAiText");
        if (!responseElement) {
            console.error('Image element not found');
            return;
        }
    } catch (error) {
        console.error("Error in try block line 7: ", error.message);
    }
    loadingSpinner.style.display = 'block'; // Show the spinner
    responseElement.style.display = 'none'; // Hide the image while loading
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
                messages: [
                    { role: "system", content: "you are a helpful assistant." },
                    { role: "user", content: inputText }
                ],
                max_tokens: 1000
            })
        });

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;
        responseElement.textContent = assistantMessage;
        responseElement.style.display = 'block';
        loadingSpinner.style.display = 'none';
    } catch (error) {
        responseElement.textContent = `Error: ${error.message}`;
    }
});
