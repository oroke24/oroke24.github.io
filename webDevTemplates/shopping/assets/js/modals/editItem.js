let currentItem = null;//track current item
// Step 6: Handle form submission
function saveItemHandler(event) {
	event.preventDefault(); // Prevent the form from submitting

    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    const quantity = document.getElementById('quantity');
    const isActive = document.getElementById('isActive');

    if(isNaN(price.value) || price.value === ''){
        alert("please enter a valid price (like: 15.50)");
        return;
    }
    if(isNaN(quantity.value) || quantity.value === ''){
        alert("Please enter a valid quantity (digits only)");
        return  ;
    }
    currentItem.name = name.value;
    currentItem.description = description.value;
    currentItem.price = price.value;
    currentItem.quantity = quantity.value;
    currentItem.isActive = isActive.checked;

    addNewItem(currentItem.jsonObject());//in js/firebase/addNew.js
    editItemModal.style.display = 'none';
};

function updateItemHandler(event) {
	event.preventDefault(); // Prevent the form from submitting

    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    const quantity = document.getElementById('quantity');
    const isActive = document.getElementById('isActive');

    if(isNaN(price.value) || price.value === ''){
        alert("please enter a valid price (like: 15.50)");
        return;
    }
    if(isNaN(quantity.value) || quantity.value === ''){
        alert("Please enter a valid quantity (digits only)");
        return  ;
    }
    currentItem.name = name.value;
    currentItem.description = description.value;
    currentItem.price = price.value;
    currentItem.quantity = quantity.value;
    currentItem.isActive = isActive.checked;

    updateItem(currentItem.jsonObject());//in js/firebase/addNew.js
    editItemModal.style.display = 'none';
};
    
    
function deleteItemHandler(event){
    event.preventDefault();
    if(!confirm(`Are you sure you want to delete ${currentItem.name}?`)) return; //base case
    deleteItem(currentItem.id);
    //else alert(`failed deleting ${item.name}.`);
    editItemModal.style.display = 'none';
};
function editItem(item, parentDiv){
    //Get elements
    const editItemModal = document.getElementById('editItemModal');
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    const quantity = document.getElementById('quantity');
    const createdOn = document.getElementById('createdOn');
    const isActive = document.getElementById('isActive');
	const saveButton = document.getElementById('saveButton');
	const updateButton = document.getElementById('updateButton');
	const deleteButton = document.getElementById('deleteButton');
    const closeModal = document.getElementById('closeEditItemModal');
    const errorMessage = document.getElementById('editItemErrorMessage');

     // Close any previously opened modal before opening a new one
    editItemModal.style.display = 'none';
    
    if(item.id) updateButton.style.display = 'inline-block';
    else updateButton.style.display = 'none';

    //Populate fields with passed in item
    //console.log("This item's id is: ", item.id);
    currentItem = item;
    name.value = item.name;
    description.value = item.description;
    price.value = item.price;
    quantity.value = item.quantity;
    item.createdOn = todaysDate();
    createdOn.textContent = item.createdOn;
    isActive.checked = item.isActive;


    //Handle opening modal logic
    editItemModal.style.display = 'flex';
    errorMessage.textContent = '';

    //change textArea for description dynamically
    resizeTextArea(description);
    description.addEventListener('input', function(){
        resizeTextArea(this);
    })

    // Reset the modal's event listeners before adding new ones
    saveButton.removeEventListener('click', saveItemHandler);
    saveButton.addEventListener('click', saveItemHandler);

    updateButton.removeEventListener('click', updateItemHandler);
    updateButton.addEventListener('click', updateItemHandler);

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
}
function resizeTextArea(textarea) {
    textarea.style.height = 'auto'; // Reset height to auto to allow shrinking
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
}

 


