function editItem(){
    // Step 1: Get elements
    const editItemModal = document.getElementById('editItemModal');
    const name = document.getElementById('name');
	const saveButton = document.getElementById('saveButton');
    const closeModal = document.getElementById('closeEditItemModal');
    const errorMessage = document.getElementById('editItemErrorMessage');


    // Step 2: Handle userbutton clicked logic
    editItemModal.style.display = 'flex';
    errorMessage.textContent = '';

    // Step 3: Close the modal when the user clicks the close button
    closeModal.addEventListener('click', function() {
    editItemModal.style.display = 'none';
    });

    // Step 4: Close the modal if the user clicks outside the modal container
	window.addEventListener('click', function(event) {
		if (event.target === editItemModal) {
			editItemModal.style.display = 'none';
		}
	});
    // Step 5: Handle form submission
	saveButton.addEventListener('click', function(event) {
		event.preventDefault(); // Prevent the form from submitting
	});
}




