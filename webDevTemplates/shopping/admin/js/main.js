document.addEventListener('DOMContentLoaded', () =>{
	const rootDiv = document.getElementById('root');
	const dropdownDiv1 = createToggleDropdown("Inventory", "dropdownDiv1Button");//in js/uiElements
	const div1group1 = dropDownArea();
	const itemList = document.createElement('div');
	const addNew = createButton("Add New");//in js/uiElements

	rootDiv.appendChild(dropdownDiv1);
	dropdownDiv1.appendChild(div1group1);    
	div1group1.appendChild(addNew);
	div1group1.appendChild(itemList);

	/*
	newItem = new Item("myName", "desc", 0, 0, new Date(), true);
	addNewItem(newItem);
	*/

	getAllFromInventory().then((items) =>{
		items.forEach(item =>{
			const listItem = document.createElement('div');
			listItem.textContent = item.displayInfo();
			itemList.appendChild(listItem);
		})	
	});

	 dropdownDiv1Button.addEventListener('click', function() {
	   div1group1.classList.toggle('show');
	 });

	 addNew.addEventListener('click', function() {
		 editItem();//in js/modals/editItem
	 });

});



