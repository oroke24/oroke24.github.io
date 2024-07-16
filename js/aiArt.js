document.getElementById('generateImageButton').addEventListener('click', async () => {
    const imagePrompt = document.getElementById('imagePrompt').value;
    const imageElement = document.getElementById('generatedImage');

    if (!imageElement) {
        console.error('Image element not found');
        return;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-proj-6det7T6sknOlEui0RLaeT3BlbkFJ6kyhQyx4NQw3vjoRLKtv`
            },
            body: JSON.stringify({
                prompt: imagePrompt,
                n: 1,
                size: "512x512"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const imageUrl = data.data[0].url;
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
