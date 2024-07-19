const button2 = document.getElementById('fineTuneButton');
button2.addEventListener('click', async (e) => {
    e.preventDefault();
    const file = document.getElementById('imageToEdit').files[0];
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const variationResolution = document.getElementById('variationResolution');

    if (!file) {
        alert("Image upload can't be empty");
        return;
    }

    if (fileIsToBig(file)) return;

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

    try {
        const imageFile = await handleFileSelect(file);
        const formData = new FormData();
        formData.append('image', imageFile); // Use the File object here
        formData.append('n', '1');
        formData.append('size', variationResolution.value);

        const response = await fetch('https://api.openai.com/v1/images/variations', {
            method: 'POST',
            headers: {
                'Authorization': myKey
            },
            body: formData
        });

        const data = await response.json();
        if (!data.data || !data.data[0]) {
            throw new Error('Unexpected response format');
        }
        const imageUrl = data.data[0].url;

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('generated-image');

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
        imageContainer.textContent = `Sorry, "Must be a valid PNG file, less than 4MB, and square." (Error: ${error.message})`;
        chatHistory.appendChild(imageContainer);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';
    }
});
