//Check if user is valid and admin
const uid = localStorage.getItem('userUID');
if(!uid || !checkAdminStatus(uid)) window.location.href = '../index.html';
//end check proceed to load page..
document.addEventListener('DOMContentLoaded', () =>{
	const rootDiv = document.getElementById('root');
	const dropdownDiv1 = createToggleDropdown("Inventory", "dropdownDiv1Button");//in js/uiElements
	const div1group1 = dropDownArea();
	const itemList = document.createElement('div');
	const addNew = createButton("Add New");//in js/uiElements
	const itemObjects = [];

	itemList.id = 'itemList';
	rootDiv.appendChild(dropdownDiv1);
	dropdownDiv1.appendChild(div1group1);    
	div1group1.appendChild(addNew);
	div1group1.appendChild(itemList);

	refreshList(itemList.id, 2);
	
	//binding dropdown button to logic for hiding/showing its group(s)
	 dropdownDiv1Button.addEventListener('click', function() {
	   div1group1.classList.toggle('show');//in assets/css/custom.css
	 });

	 addNew.addEventListener('click', function() {
		 const newItem = new Item();//empty item
		 editItem(newItem);//in js/modals/editItem

	 });

});



