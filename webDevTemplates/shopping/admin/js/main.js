const rootDiv = document.getElementById('root');
const dropdownDiv1 = createToggleDropdown("Items for sale");
const div1group1 = dropDownArea();
//const items = getAllFromInventory();
//rootDiv.appendChild(mainMenu());
rootDiv.appendChild(dropdownDiv1);
dropdownDiv1.appendChild(div1group1);    

newItem = new Item("myName", "desc", 0, 0, new Date(), true);
addNewItem(newItem);

getAllFromInventory().then((items) =>{
	items.forEach(item =>{
		const listItem = document.createElement('div');
		listItem.textContent = item.displayInfo();
		div1group1.appendChild(listItem);
	})	
});

 // Toggle the visibility of the menu when the button is clicked
 dropdownToggleButton.addEventListener('click', function() {
   // Toggle the class 'show' to control visibility
   div1group1.classList.toggle('show');
 });


