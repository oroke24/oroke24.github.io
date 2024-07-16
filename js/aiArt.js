document.getElementById('generateImageButton').addEventListener('click', async () => {
    const imagePrompt = document.getElementById('imagePrompt').value;
    const imageElement = document.getElementById('generatedImage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    let myKey = "";
    try {
        myKey = await findMyKey("openAiArt");
        if (!imageElement) {
            console.error('Image element not found');
            return;
        }
    } catch (error) {
        console.error("Error in aiArt try block line 7: ", error.message);
    }

    loadingSpinner.style.display = 'block'; // Show the spinner
    imageElement.style.display = 'none'; // Hide the image while loading

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myKey
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
        loadingSpinner.style.display = 'none';
    } catch (error) {
        console.error(`Error aiArt try block line 23: ${error.message}`);
    }
});
