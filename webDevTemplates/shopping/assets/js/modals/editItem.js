function editItem(item){
    //Get elements
    const editItemModal = document.getElementById('editItemModal');
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    const quantity = document.getElementById('quantity');
    const createdOn = document.getElementById('createdOn');
    const isActive = document.getElementById('isActive');
	const saveButton = document.getElementById('saveButton');
	const deleteButton = document.getElementById('deleteButton');
    const closeModal = document.getElementById('closeEditItemModal');
    const errorMessage = document.getElementById('editItemErrorMessage');

     // Close any previously opened modal before opening a new one
    editItemModal.style.display = 'none';

    //Populate fields with passed in item
    //console.log("This item's id is: ", item.id);
    const id = item.id;
    name.value = item.name;
    description.value = item.description;
    price.value = item.price;
    quantity.value = item.quantity;
    if(!item.createdOn) item.createdOn = todaysDate();
    createdOn.textContent = item.createdOn;
    isActive.checked = item.isActive;


    //Handle opening modal logic
    editItemModal.style.display = 'flex';
    errorMessage.textContent = '';

    // Reset the modal's event listeners before adding new ones
    saveButton.removeEventListener('click', saveItemHandler);
    saveButton.addEventListener('click', saveItemHandler);

    deleteButton.removeEventListener('click', deleteItemHandler);
    deleteButton.addEventListener('click', deleteItemHandler);


    //Close the modal when the user clicks the close button
    closeModal.addEventListener('click', function() {
    editItemModal.style.display = 'none';
    });

    //Close the modal if the user clicks outside the modal container
	window.addEventListener('click', function(event) {
		if (event.target === editItemModal) {
			editItemModal.style.display = 'none';
		}
	});

    // Step 6: Handle form submission
	function saveItemHandler(event) {
		event.preventDefault(); // Prevent the form from submitting

        if(isNaN(price.value) || price.value === ''){
            alert("please enter a valid price (like: 15.50)");
            return;
        }
        if(isNaN(quantity.value) || quantity.value === ''){
            alert("Please enter a valid quantity (digits only)");
            return  ;
        }
        item.name = name.value;
        item.description = description.value;
        item.price = price.value;
        item.quantity = quantity.value;
        item.isActive = isActive.checked;
        addNewItem(item.jsonObject());
        editItemModal.style.display = 'none';
	};
    
    function deleteItemHandler(event){
        event.preventDefault();
        if(!confirm(`Are you sure you want to delete ${item.name}?`)) return; //base case
        deleteItem(id);
        //else alert(`failed deleting ${item.name}.`);
        editItemModal.style.display = 'none';
    };
}




