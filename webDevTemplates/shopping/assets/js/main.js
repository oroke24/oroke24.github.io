document.addEventListener('DOMContentLoaded', async () =>{
	const items = await getAllFromInventory();

	console.log("items: ", items);
	const horizontalScrollRoot = document.getElementById('horizontalRoot');
	const horizontalScrollDiv = horizontalScroll('horizontalScroll', items);
	
	horizontalScrollRoot.appendChild(horizontalScrollDiv);

	const inventoryRoot = document.getElementById('inventoryRoot');
	const allItemsContainer = createToggleDropdown('All Items', 'allItemsButton');//args: name, buttonName
	const allItemsDiv = dropDownArea('allItemsDiv');//args: div.id

	allItemsContainer.appendChild(allItemsDiv);
	inventoryRoot.appendChild(allItemsContainer);

	//console.log("allItemsDiv.id: ", allItemsDiv.id)
	//refreshList(allItemsDiv.id, 1);

	allItemsButton.addEventListener('click', function(){
		allItemsDiv.classList.toggle('show');
		refreshList(allItemsDiv.id);

	});
});