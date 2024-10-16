async function fightPrompt(prompt, assistantType) {
    let conversationHistory = [
        { role: "system", content: assistantType },
        { role: "user", content: prompt}
    ];

    const model = "gpt-4o";
    var responseElement;

    let myKey = "";
    try {
        myKey = await findMyKey("openAiText");
    } catch (error) {
        console.error("Error getting key: ", error.message);
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myKey
            },
            body: JSON.stringify({
                model: model,
                messages: conversationHistory,
            })
        });

        const data = await response.json();
        responseElement = data.choices[0].message.content;

        // Scroll to the bottom of chat history
    } catch (error) {
        responseElement = `Error: ${error.message}`;
    }
        return processResponse(responseElement);
}
function processResponse(str) {
    let result = ``;
    for (let i = 0; i < str.length; i++) {
        if (str.slice(i, i + 3) === `###`) {
            result += `<br><br>`;
            i++;
        }
        else if (str.slice(i, i + 3) === `**`) {
            result += `<br>`;
            i++;
        }
        else result += str[i];
    }
    return result;
}
