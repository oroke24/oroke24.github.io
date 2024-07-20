async function sendToEditAPI(file, chatHistory, loadingSpinner, variationResolution, editInput, myKey){
    try {
        const handledImage = await handleFileSelect(file.files[0]);
        const originalImageUrl = URL.createObjectURL(handledImage);
        const originalImageElement = document.createElement('img');
        originalImageElement.src = originalImageUrl;

        const originalImageContainer = document.createElement('div');
        originalImageContainer.classList.add('user-message');
        originalImageContainer.textContent = `original image with: ${editInput}`;
        originalImageContainer.appendChild(originalImageElement);
        chatHistory.insertBefore(originalImageContainer, loadingSpinner);

        const imageFile = await handleFileSelect(file.files[0]);

        const formData = new FormData();
        formData.append('image', imageFile); // Use the File object here
        formData.append('prompt', editInput);
        formData.append('n', '1');
        formData.append('size', variationResolution.value);

        const response = await fetch('https://api.openai.com/v1/images/edits', {
            method: 'POST',
            headers: {
                'Authorization': myKey
            },
            body: formData
        });

        const data = await response.json();
        /*
        if (!data.data || !data.data[0]) {
            throw new Error('Unexpected response format');
        }
        */
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
        imageContainer.textContent = `Sorry, "Must be a valid PNG or JPG and less than 4MB." (Error: ${error.message})`;
        chatHistory.insertBefore(imageContainer, loadingSpinner);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';
    }
};