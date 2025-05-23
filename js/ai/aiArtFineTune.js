const button2 = document.getElementById('fineTuneButton');
button2.addEventListener('click', async (e) => {
    e.preventDefault();
    const file = document.getElementById('imageToEdit');
    const chatHistory = document.getElementById('chatHistory');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const variationResolution = document.getElementById('variationResolution');
    const editInput = document.getElementById('editInput');


    if (!file.files[0]) {
        alert("Image upload can't be empty");
        return;
    }

    //if (fileIsToBig(file)) return;
    // Check the file type
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/heic', 'image/heif'];
    if (!acceptedTypes.includes(file.files[0].type)) {
        alert("Unsupported file type. Please upload a JPEG or PNG image.");
        return;
    }
    /*
        if (file.type === 'image/heic' || file.type === 'image/heif') {
            try {
                const heicBlob = await heic2any({ blob: file, toType: 'image/png' });
                file = new File([heicBlob], file.name.replace(/\.[^.]+$/, '.png'), { type: 'image/png' });
            } catch (error) {
                return reject(new Error('Error converting HEIC to PNG'));
            }
        }
    */

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
    button2.style.display = 'none';//hide button
    chatHistory.scrollTop = chatHistory.scrollHeight;

    /*
    //handle edit case
    console.log("editInput.value: ", editInput.value);
    if (editInput.value.trim().length != 0) {
        sendToEditAPI(file, chatHistory, loadingSpinner, variationResolution, editInput, myKey);
        editInput.value = "";
        return;
    }
    */

    try {
        const handledImage= await handleFileSelect(file.files[0]);
        const originalImageUrl = URL.createObjectURL(handledImage);
        const originalImageElement = document.createElement('img');
        originalImageElement.src = originalImageUrl;

        const originalImageContainer = document.createElement('div');
        originalImageContainer.classList.add('user-message');
        originalImageContainer.textContent = `original image:`;
        originalImageContainer.appendChild(originalImageElement);
        chatHistory.insertBefore(originalImageContainer, loadingSpinner);

        const imageFile = await handleFileSelect(file.files[0]);


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

    } catch (error) {
        const imageContainer = document.createElement('div');
        imageContainer.textContent = `Sorry, "Must be a valid PNG or JPG and less than 4MB." (Error: ${error.message})`;
        chatHistory.insertBefore(imageContainer, loadingSpinner);
        loadingSpinner.style.display = 'none';
        button2.style.display = 'block';
    }
});
