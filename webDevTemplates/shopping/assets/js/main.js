document.addEventListener('DOMContentLoaded', async () =>{
	const logoutButton = document.getElementById('logoutButton');
	//const authorizationManager = new AuthorizationManager();
	let items = await window.itemDataManager.getAllFromInventory();
	let activeItems = [];
	items.forEach(item=>{
		if(item.isActive) activeItems.push(item);
	});
	items = activeItems;

	//console.log("items: ", items);
	//const horizontalScrollRoot = document.getElementById('horizontalRoot');
	const horizontalScrollRoot = document.createElement('div');
	let horizontalScrollDiv = await horizontalScroll('horizontalScroll', items);
	horizontalScrollRoot.appendChild(horizontalScrollDiv);
	

	const inventoryRoot = document.getElementById('inventoryRoot');
	const allItemsContainer = createToggleDropdown('All Items', 'allItemsButton');//args: name, buttonName
	const allItemsDiv = dropDownArea('allItemsDiv');//args: div.id
	allItemsDiv.style.overflow = 'hidden';
	allItemsContainer.appendChild(allItemsDiv);

	inventoryRoot.appendChild(horizontalScrollRoot);
	inventoryRoot.appendChild(allItemsContainer);
	//refreshList('allItemsDiv');
	allItemsButton.addEventListener('click', function(){
		window.itemDataManager.refreshList(allItemsDiv.id, 1);
		allItemsDiv.classList.toggle('show');
	});	
	logoutButton.addEventListener('click', ()=> window.authorizationManager.logout());

});