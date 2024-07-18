const button2 = document.getElementById('fineTuneButton');
button2.addEventListener('click', async (e) => {
    e.preventDefault();
    const file = document.getElementById('imageToEdit');
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const variationResolution = document.getElementById('variationResolution');

    if (file.files.length == 0) {
        alert("Image upload can't be empty")
        return;
    }
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

    const formData = new FormData();
    formData.append('image', file.files[0]);
    formData.append('n', '1');
    formData.append('size', variationResolution.value);
    try {
        const response = await fetch('https://api.openai.com/v1/images/variations', {
            method: 'POST',
            headers: {
                'Authorization': myKey
            },
            'body': formData
        });

        const data = await response.json();
        const imageUrl = data.data[0].url;

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('generated-image')

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('assistant-message');
        imageContainer.textContent = `${variationResolution.value}, variation image:`;
        imageContainer.appendChild(imageElement);

        chatHistory.insertBefore(imageContainer, loadingSpinner);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';
        chatHistory.scrollTop = chatHistory.scrollHeight;

    } catch (error) {
        const imageContainer = document.createElement('div');
        imageContainer.textContent = `Error: ${error.message}`;
        chatHistory.appendChild(imageContainer);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';
    }
});
