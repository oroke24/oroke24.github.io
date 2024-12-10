function viewItem(item){
    //initialize
	const viewItemModal = document.getElementById('viewItemModal');
    const closeModal = document.getElementById('closeViewItemModal');
    const itemDetailsContainer = document.getElementById('itemDetails');

    itemDetailsContainer.innerHTML = '';

    const name = document.createElement('div');
    name.classList.add('modal-item-detail');
    name.textContent = `Name: ${item.name}`;
    itemDetailsContainer.appendChild(name);

    const price = document.createElement('div');
    price.classList.add('modal-item-detail');
    price.textContent = `$${item.price} USD`;
    itemDetailsContainer.appendChild(price);

    const description = document.createElement('div');
    name.classList.add('modal-item-detail');
    description.textContent = `Description: ${item.description}`;
    itemDetailsContainer.appendChild(description);

    const quantity = document.createElement('div');
    quantity.classList.add('modal-item-detail');
    quantity.textContent = `only ${item.quantity} left`;
    itemDetailsContainer.appendChild(quantity);

    const createdOn = document.createElement('div');
    createdOn.classList.add('modal-item-detail');
    createdOn.textContent = `Release Date: ${item.createdOn}`;
    itemDetailsContainer.appendChild(createdOn);

    //Handle opening modal logic
    viewItemModal.style.display = 'flex';
    
    //Close the modal when the user clicks the close button
    closeModal.addEventListener('click', function() {
    viewItemModal.style.display = 'none';
    });

    //Close the modal if the user clicks outside the modal container
	window.addEventListener('click', function(event) {
		if (event.target === viewItemModal) {
			viewItemModal.style.display = 'none';
		}
	});
}