let currentItem = null;//track current item

function editItem(item, parentDiv = null, listType = 1){
    const editItemModal = document.getElementById('editItemModal');
    const editItemContainer = document.getElementById('editItemContainer');
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    const quantity = document.getElementById('quantity');
    const createdOn = document.getElementById('createdOn');
    const isActive = document.getElementById('isActive');
    const closeModal = document.getElementById('closeEditItemModal');
    const errorMessage = document.getElementById('editItemErrorMessage');
    const saveButtonContainer = document.createElement('div');
    const imageBox = createImageBox();
    const imageUploadButton = createImageUploadButton();
    const smallImages = horizontalImageList('smallImages', item);
	const saveButton = createButton('Save as New');
	const updateButton = createButton('Update');
    const deleteButton = createIconFromClass('fas', 'fa-trash');

    //editItemContainer.classList.add('over-sticky');

    saveButtonContainer.style.width = '100%';
    saveButtonContainer.style.display = 'flex';
    saveButtonContainer.style.justifyContent = 'flex-end';

    if(item.id){
		saveButtonContainer.appendChild(updateButton);
        editItemContainer.insertBefore(deleteButton, createdOn);
    }

    imageBox.appendChild(imageUploadButton); 
    editItemContainer.insertBefore(imageBox, createdOn);
    editItemContainer.insertBefore(smallImages, createdOn);
    editItemContainer.appendChild(saveButtonContainer);
    saveButtonContainer.appendChild(saveButton);

    const buttons = [saveButton, updateButton, deleteButton];
    buttons.forEach(node=>{
        node.classList.add('rightAnchor');
    });
    imageUploadButton.addEventListener('change', (event) => {
		const file = event.target.files[0];
        populateImage(file, imageBox.id);
        item.images.push(file)
        //window.itemDataManager.addNewImage(file, item); 
	});
    saveButton.addEventListener('click', (e) => {
        const isReplacing = false;
        saveItemHandler(e, isReplacing, parentDiv, listType);
        removeNodes(saveButton, updateButton, deleteButton, imageBox, smallImages);
    });
    updateButton.addEventListener('click', (e) => {
        const isReplacing = true;
        saveItemHandler(e, isReplacing, parentDiv, listType);
        removeNodes(saveButton, updateButton, deleteButton, imageBox, smallImages);
    });
    deleteButton.addEventListener('click', (e) => {
        deleteItemHandler(e, parentDiv, listType);
        removeNodes(saveButton, updateButton, deleteButton, imageBox, smallImages);
    });

     // Close any previously opened modal before opening a new one
    editItemModal.style.display = 'none';
    
    //Populate fields with passed in item
    currentItem = item;
    //currentItem.images = item.images;
    name.value = item.name;
    description.value = item.description;
    price.value = item.price;
    quantity.value = item.quantity;
    item.createdOn = todaysDate();
    createdOn.textContent = item.createdOn;
    isActive.checked = item.isActive;


    //Handle opening modal logic
    editItemModal.style.display = 'flex';
    saveButton.style.display = 'flex';
    updateButton.style.display = 'flex';
    deleteButton.style.display = 'flex';
    errorMessage.textContent = '';

    //change textArea for description dynamically
    resizeTextArea(description);
    description.addEventListener('input', function(){
        resizeTextArea(this);
    })

    //Close the modal when the user clicks the close button
    closeModal.addEventListener('click', function() {
	    editItemModal.style.display = 'none';
        removeNodes(saveButton, updateButton, deleteButton, imageBox, smallImages);
    });

    //Close the modal if the user clicks outside the modal container
	window.addEventListener('click', function(event) {
		if (event.target === editItemModal) {
			editItemModal.style.display = 'none';
            removeNodes(saveButton, updateButton, deleteButton, imageBox, smallImages);
		}
	});
}
function saveItemHandler(event, isReplacing = false, parentDiv, listType) {
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
        return;
    }
    currentItem.name = name.value;
    currentItem.description = description.value;
    currentItem.price = price.value;
    currentItem.quantity = quantity.value;
    currentItem.isActive = isActive.checked;

    console.log("in saveButton, parentDiv: ", parentDiv);
    if(isReplacing) window.itemDataManager.updateItem(currentItem.jsonObject(), parentDiv, listType);
    else window.itemDataManager.addNewItem(currentItem, parentDiv, listType);//in js/firebase/addNew.js
    editItemModal.style.display = 'none';
};
    
function deleteItemHandler(event, parentDiv, listType){
    event.preventDefault();
    if(!confirm(`Are you sure you want to delete ${currentItem.name}?`)) return; //base case
    window.itemDataManager.deleteItem(currentItem.id, parentDiv, listType);
    //else alert(`failed deleting ${item.name}.`);
    editItemModal.style.display = 'none';
};
function resizeTextArea(textarea) {
    textarea.style.height = 'auto'; // Reset height to auto to allow shrinking
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
}




 


