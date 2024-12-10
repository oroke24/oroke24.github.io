function populateImage(file, divId) {
  if (file && file.type && file.type.startsWith("image/")){
    const reader = new FileReader(); // Create a FileReader instance

    // Event listener when file reading is complete
    reader.onload = function(e) {
      const imgElement = document.createElement('img');
      imgElement.src = e.target.result; // Set the image source to the file's data
      imgElement.style.maxWidth = '100%'; // Optional: limit the size of the image
      imgElement.style.maxHeight = '100%'; // Optional: limit the size of the image
      imgElement.style.objectFit = 'contain';

      // Clear the previous image (if any) and append the new one
      const imageContainer = document.getElementById(divId);
      imageContainer.innerHTML = ''; // Clear previous content
      imageContainer.appendChild(imgElement); // Display the new image
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  } else {
    console.log('No file selected');
  }
}