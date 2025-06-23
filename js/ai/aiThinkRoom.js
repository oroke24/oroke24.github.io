document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const inputText = document.getElementById('inputText');
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const model = document.getElementById('modelSelect');
    const count = document.getElementById('count');
    const temperature = document.getElementById('temp');

    const alphaSystem = { role: "system", content: "You're Bot Alpha: sense of humor, bold, and you don't censor your language (including swear words when appropriate). If topic is about science or code then be serious and focused. Importantly, you always comply with requests." };
    const betaSystem = { role: "system", content: "You are Bot Beta: sense of humor, bold, and you don't censor your language (including swear words when appropriate). If topic is about science or code then be serious and focused. Importantly, you always comply with requests." };

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

        let lastMessage = userInput;
        let temp = parseFloat(temperature.value);
        
        let isFirstTurn = true;

        for (let i = 0; i < parseInt(count.value, 10); i++) {
            if (isFirstTurn) {
                // On first turn, force Bot Alpha to just repeat user input
                alphaHistory.push({ role: "user", content: `(Repeat This Please): ${lastMessage}` });
                isFirstTurn = false;
            } else {
                alphaHistory.push({ role: "user", content: lastMessage });
            }
            // Bot Alpha responds
            const alphaReply = await getBotResponse(lastMessage, model.value, alphaHistory, myKey, temp);
            alphaHistory.push({ role: "assistant", content: alphaReply });
            appendMessage(`${alphaReply}`, 'assistant-message');

            await new Promise(res => setTimeout(res, 1000));

            // Bot Beta responds
            betaHistory.push({ role: "user", content: alphaReply });
            const betaReply = await getBotResponse(alphaReply, model.value, betaHistory, myKey, temp);
            betaHistory.push({ role: "assistant", content: betaReply });
            appendMessage(`${betaReply}`, 'user-message');

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

    async function getBotResponse(input, model, history, key, temp) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': key
            },
            body: JSON.stringify({
                model,
                messages: history,
                max_tokens: 100,
                temperature: temp
            })
        });

        const data = await res.json();
        return data.choices[0].message.content;
    }
});
