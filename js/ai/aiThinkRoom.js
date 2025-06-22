document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const inputText = document.getElementById('inputText');
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const model = document.getElementById('modelSelect');
    const count = document.getElementById('count');

    const alphaSystem = { role: "system", content: "You are Bot Alpha: direct, witty, and brief." };
    const betaSystem = { role: "system", content: "You are Bot Beta: thoughtful, kind, and detailed." };

    sendButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const userInput = inputText.value.trim();
        if (!userInput) return alert("Input can't be empty");

        const myKey = await findMyKey("openAiText");
        sendButton.style.display = 'none';
        loadingSpinner.style.display = 'block';

        //appendMessage(`User: ${userInput}`, 'user-message');

        let alphaHistory = [alphaSystem];
        let betaHistory = [betaSystem];

        let lastMessage = "(Repeat this prompt to me) " + userInput;

        for (let i = 0; i < count.value; i++) {
            // Bot Alpha responds
            alphaHistory.push({ role: "user", content: lastMessage });
            const alphaReply = await getBotResponse(lastMessage, model.value, alphaHistory, myKey);
            alphaHistory.push({ role: "assistant", content: alphaReply });
            appendMessage(`Bot Alpha: ${alphaReply}`, 'assistant-message');

            await new Promise(res => setTimeout(res, 1000));

            // Bot Beta responds
            betaHistory.push({ role: "user", content: alphaReply });
            const betaReply = await getBotResponse(alphaReply, model.value, betaHistory, myKey);
            betaHistory.push({ role: "assistant", content: betaReply });
            appendMessage(`Bot Beta: ${betaReply}`, 'user-message');

            lastMessage = betaReply;
            await new Promise(res => setTimeout(res, 1000));
        }

        sendButton.style.display = 'block';
        loadingSpinner.style.display = 'none';
        inputText.value = lastMessage;
    });

    function appendMessage(text, className) {
        const msg = document.createElement('div');
        msg.classList.add('message', className);
        msg.textContent = text;
        chatHistory.insertBefore(msg, loadingSpinner);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    async function getBotResponse(input, model, history, key) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': key
            },
            body: JSON.stringify({
                model,
                messages: history
            })
        });

        const data = await res.json();
        return data.choices[0].message.content;
    }
});
