document.addEventListener('DOMContentLoaded', () =>{
	const inventoryRoot = document.getElementById('inventoryRoot');
	const allItemsContainer = createToggleDropdown('All Items', 'allItemsButton');//args: name, buttonName
	const allItemsDiv = dropDownArea('allItemsDiv');//usage: ('div.id')

	allItemsContainer.appendChild(allItemsDiv);
	inventoryRoot.appendChild(allItemsContainer);

	refreshList('allItemsDiv');

	allItemsButton.addEventListener('click', function(){
		allItemsDiv.classList.toggle('show');
		refreshList(allItemsDiv);

	});
});