function createEditItemModal() {
    // Create the outer modal container
    const modal = document.createElement('div');
    modal.id = 'editItemModal';

    // Create the inner container for the modal content
    const container = document.createElement('div');
    container.id = 'editItemContainer';

    // Close button
    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.id = 'closeEditItemModal';
    closeButton.innerHTML = '&times;';  // Close icon

    // Created On label
    const createdOn = document.createElement('div');
    createdOn.id = 'createdOn';

    // Name input field
    const nameGroup = document.createElement('div');
    nameGroup.classList.add('form-group');
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.placeholder = 'Enter name';
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);

    // Description input field
    const descriptionGroup = document.createElement('div');
    descriptionGroup.classList.add('form-group');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description:';
    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.id = 'description';
    descriptionTextarea.placeholder = 'Enter description';
    descriptionGroup.appendChild(descriptionLabel);
    descriptionGroup.appendChild(descriptionTextarea);

    // Price input field
    const priceGroup = document.createElement('div');
    priceGroup.classList.add('form-group');
    const priceLabel = document.createElement('label');
    priceLabel.setAttribute('for', 'price');
    priceLabel.textContent = 'Price:';
    const priceInput = document.createElement('input');
    priceInput.type = 'text';
    priceInput.id = 'price';
    priceInput.placeholder = 'Enter price';
    priceGroup.appendChild(priceLabel);
    priceGroup.appendChild(priceInput);

    // Quantity input field
    const quantityGroup = document.createElement('div');
    quantityGroup.classList.add('form-group');
    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('for', 'quantity');
    quantityLabel.textContent = 'Quantity:';
    const quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.id = 'quantity';
    quantityInput.placeholder = 'Enter quantity';
    quantityGroup.appendChild(quantityLabel);
    quantityGroup.appendChild(quantityInput);

    // Is Active checkbox
    const activeGroup = document.createElement('div');
    activeGroup.classList.add('form-group');
    activeGroup.style.display = 'flex';
    activeGroup.style.margin = '10px';
    const activeLabel = document.createElement('label');
    activeLabel.setAttribute('for', 'isActive');
    activeLabel.style.marginRight = '10px';
    activeLabel.textContent = 'Currently active?';
    const customSwitch = document.createElement('div');
    customSwitch.classList.add('custom-control', 'custom-switch');
    const isActiveCheckbox = document.createElement('input');
    isActiveCheckbox.type = 'checkbox';
    isActiveCheckbox.classList.add('custom-control-input');
    isActiveCheckbox.id = 'isActive';
    const customSwitchLabel = document.createElement('label');
    customSwitchLabel.classList.add('custom-control-label');
    customSwitchLabel.setAttribute('for', 'isActive');
    customSwitch.appendChild(isActiveCheckbox);
    customSwitch.appendChild(customSwitchLabel);
    activeGroup.appendChild(activeLabel);
    activeGroup.appendChild(customSwitch);

    // Save, Update and Delete buttons
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.classList.add('btn', 'bg-success', 'text-light');
    saveButton.style.width = '90%';
    saveButton.style.padding = '15px';
    saveButton.textContent = 'Save As New Item';

    const updateButton = document.createElement('button');
    updateButton.id = 'updateButton';
    updateButton.classList.add('btn', 'bg-warning', 'text-light');
    updateButton.style.width = '90%';
    updateButton.style.padding = '15px';
    updateButton.style.display = 'none';
    updateButton.textContent = 'Update This Item';

    const deleteButton = document.createElement('button');
    deleteButton.id = 'deleteButton';
    deleteButton.classList.add('btn', 'text-light');
    deleteButton.style.width = '90%';
    deleteButton.style.padding = '15px';
    deleteButton.textContent = 'Delete Item';

    // Error message container
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.id = 'editItemErrorMessage';

    // Append all elements to the container
    container.appendChild(closeButton);
    container.appendChild(createdOn);
    container.appendChild(nameGroup);
    container.appendChild(descriptionGroup);
    container.appendChild(priceGroup);
    container.appendChild(quantityGroup);
    container.appendChild(activeGroup);
    container.appendChild(saveButton);
    container.appendChild(updateButton);
    container.appendChild(deleteButton);
    container.appendChild(errorMessage);

    // Append container to modal
    modal.appendChild(container);

    return modal;
}
